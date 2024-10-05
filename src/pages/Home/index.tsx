/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PageLoading from "../PageLoading";
import {
  INITIAL_PINTRAIL_MESSAGE,
  LOGIN_UNAUTHORIZED_REDIRECTING_MESSAGE,
  PAGE_LOADING_MESSAGE,
} from "../../variables/constants/home";
import TextInput from "../../components/TextInput";
import ShowChatWrappers from "./modular/ShowChatWrappers";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  IChatData,
  OneToOneChat,
} from "../../interfaces/home";
import { cookies } from "../../config/cookie";
import {
  HERMES_SERVICE,
  OLYMPUS_SERVICE,
} from "../../config/environment";
import {
  URL_POST_GOOGLE_CALLBACK,
  URL_POST_LOGOUT,
} from "../../config/xhr/routes/credentials";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  X_SID,
} from "../../variables/global";
import {
  clearAllUrlParameters,
  removeTrailingNewlines,
} from "../../utils/functions/global";
import { URL_POST_AGENT_MESSAGING } from "../../config/xhr/routes/home";
import db from "../../config/dexie/dexie";
import moment from "moment";
import {
  ICookieInfo,
  IUserData,
} from "../../interfaces/credential";
import { v4 as uuidv4 } from "uuid";
import {
  AI_ID,
  AI_NAME,
  AI_PROFILE_PIC_URL,
} from "../../variables/constants/ai";
import { BuildingDetails } from "../../interfaces/building";
import { BuildingDetailsDTO } from "../../dtos/building";
import {
  AdvanceAxiosRequestHeaders,
  isIResponseObject,
} from "../../interfaces/axios";
import { trackPromise } from "react-promise-tracker";
import { IS_NOT_AUTHENTICATE } from "../../utils/validations/credential";
import MainLogo from "../../assets/svg/pintrail.svg";

export default function Home() {
  // REFS //
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyContainerRef = useRef<HTMLDivElement>(null);

  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();

  // STATES //
  const [user, setUser] = useState<IUserData | null>(null);
  const [rendered, setRendered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<IChatData[]>([]);

  // VARIABLES //
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";
  const parentContainerClassName = rendered
    ? "visible home-page-container"
    : "hidden no-height";

  // FUNCTIONS //
  const handleInitialize = async () => {
    try {
      const clientUserInfo = cookies.get(CLIENT_USER_INFO);
      const searchParamScopes = window.location.search;

      if (clientUserInfo?.user) {
        setUser(clientUserInfo.user);
        clearAllUrlParameters();
      } else if (
        searchParamScopes?.includes("googleapis")
      ) {
        const scopes = searchParamScopes;
        clearAllUrlParameters();
        await handleGoogleAuthListener(scopes);
      }

      const allChatData = await db.transaction(
        "rw",
        db.chat_data,
        async () => {
          return await db.chat_data
            .filter(
              (chat) =>
                chat.sender.id ===
                  clientUserInfo?.user.userId ||
                (chat.sender.id === AI_ID &&
                  chat.content.sendSpecificToId ===
                    clientUserInfo?.user.userId)
            )
            .sortBy("timestamp");
        }
      );

      const timeNow = moment(new Date())
        .format("dddd, MMMM Do YYYY, h:mm:ss a")
        .toString();
      const initMessage: OneToOneChat = {
        id: uuidv4(),
        chatContent: INITIAL_PINTRAIL_MESSAGE,
        senderId: AI_ID,
        senderFullName: AI_NAME,
        sendSpecificToId: user?.userId,
        senderProfilePictureUri: AI_PROFILE_PIC_URL,
        createdAt: timeNow,
      };

      const initData = handleCreateMessage(initMessage);
      allChatData.push(initData);
      setChats(allChatData);
    } catch (error) {
      console.error("Failed to initialize:", error);
    } finally {
      setRendered(true);
    }
  };

  const handleOnSendMessage = async () => {
    try {
      if (loading)
        return window.alert("Sabar lagi loading nih !");
      if (!user) return;
      if (chatInputRef.current?.value !== "") {
        setLoading(true);
        const timeNow = moment(new Date())
          .format("dddd, MMMM Do YYYY, h:mm:ss a")
          .toString();
        const userMessage: OneToOneChat = {
          id: uuidv4(),
          chatContent: chatInputRef.current!.value,
          senderId: user.userId,
          senderFullName: user.fullName,
          sendSpecificToId: AI_ID,
          senderProfilePictureUri: "",
          createdAt: timeNow,
        };
        chatInputRef.current!.value = "";

        const chatData: IChatData =
          handleCreateMessage(userMessage);

        setChats((record) => {
          const temp: IChatData[] = [...record];
          temp.push(chatData);
          return temp;
        });

        handleOnMessageSaving(chatData, timeNow);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleOnMessageSaving = async (
    userChatData: IChatData,
    timeNow: string
  ) => {
    const abortController = new AbortController();
    const axiosTimeout = axiosService.setAxiosTimeout(
      abortController,
      120000
    );

    try {
      const clientUserInfo: ICookieInfo = cookies.get(
        CLIENT_USER_INFO
      );
      const response = await axiosService.postData({
        endpoint: HERMES_SERVICE,
        url: `${URL_POST_AGENT_MESSAGING}`,
        headers: {
          [AUTHORIZATION]:
            `Bearer ${clientUserInfo?.credentialToken.accessToken}` ||
            "",
          [X_SID]: clientUserInfo?.sid || "",
        } as unknown as AdvanceAxiosRequestHeaders,
        data: {
          sessionId: userChatData.sender.id,
          content: userChatData.content.chatContent,
          refreshToken:
            clientUserInfo.credentialToken.refreshToken,
        },
        controller: abortController,
      });

      clearTimeout(axiosTimeout);

      const aiMessage: OneToOneChat = {
        id: uuidv4(),
        chatContent: removeTrailingNewlines(
          response.responseData?.output
        ),
        senderId: AI_ID,
        senderFullName: AI_NAME,
        sendSpecificToId: user?.userId,
        senderProfilePictureUri: AI_PROFILE_PIC_URL,
        createdAt: timeNow,
      };

      const parsedContent: BuildingDetailsDTO[] =
        JSON.parse(response.responseData?.output_content);

      const buildingContents = parsedContent?.map(
        (obj): BuildingDetails => {
          obj.image_url = obj.image_url.replace(/'/g, '"');
          const actualImages: string[] = JSON.parse(
            obj.image_url
          );

          return {
            ...obj,
            image_url: actualImages,
          };
        }
      );

      const chatData: IChatData = handleCreateMessage(
        aiMessage,
        buildingContents
      );

      setChats((record) => {
        const temp: IChatData[] = [...record];
        temp.push(chatData);
        return temp;
      });

      await db.transaction("rw", db.chat_data, () => {
        db.chat_data.bulkAdd([userChatData, chatData]);
      });
    } catch (error) {
      if (
        isIResponseObject(error) &&
        IS_NOT_AUTHENTICATE(error)
      ) {
        cookies.remove(CLIENT_USER_INFO, { path: "/" });
        return setUser(null);
      }
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMessage = (
    message: OneToOneChat,
    buildingContents?: BuildingDetails[]
  ) => {
    const chatData: IChatData = {
      id: uuidv4(),
      sender: {
        id: message.senderId,
        fullName: message.senderFullName,
        profilePictureURI: message.senderProfilePictureUri,
      },
      content: message,
      buildingContents: buildingContents,
      timestamp: new Date().toISOString(),
    };
    return chatData;
  };

  const handleGoogleAuthListener = async (
    queryString: string
  ) => {
    try {
      const abortController = new AbortController();
      const axiosTimeout =
        axiosService.setAxiosTimeout(abortController);

      const result = await axiosService.postData({
        endpoint: OLYMPUS_SERVICE,
        url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
        controller: abortController,
      });

      clearTimeout(axiosTimeout);

      let loggedUser: any | undefined = undefined;
      loggedUser = result.responseData.user;
      setUser(loggedUser);
      cookies.set(CLIENT_USER_INFO, result.responseData);
    } catch (error) {
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
      handleError(error);
      navigate("/login");
    }
  };

  const handleLogout = () => {
    const abortController = new AbortController();
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);
    const clientUserInfo: ICookieInfo = cookies.get(
      CLIENT_USER_INFO
    );
    if (!clientUserInfo?.user) return;
    trackPromise(
      axiosService
        .postData({
          headers: {
            [X_SID]: clientUserInfo?.sid || "",
          } as unknown as AdvanceAxiosRequestHeaders,
          endpoint: OLYMPUS_SERVICE,
          url: URL_POST_LOGOUT,
          controller: abortController,
        })
        .then(() => navigate("/login"))
        .catch((error) => handleError(error))
        .finally(() => {
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
          clearTimeout(axiosTimeout);
        })
    );
  };

  const handleError = (error: any) => {
    console.log(error);
    if (isIResponseObject(error))
      return alert(JSON.stringify(error.errorContent));
    alert(JSON.stringify(error));
  };

  useEffect(() => {
    handleInitialize();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat body container
    if (chatBodyContainerRef.current) {
      chatBodyContainerRef.current.scrollTop =
        chatBodyContainerRef.current.scrollHeight;
    }
  }, [chats]);

  // Placeholder message while redirecting to home page
  if (!rendered) {
    return (
      <PageLoading
        className={pageLoadingClassName}
        loadingMessage={PAGE_LOADING_MESSAGE}
        noLogo={false}
      />
    );
  }

  if (rendered && !user) {
    navigate("/login");
    return (
      <PageLoading
        className={pageLoadingClassName}
        loadingMessage={
          LOGIN_UNAUTHORIZED_REDIRECTING_MESSAGE
        }
        noLogo={false}
      />
    );
  }

  return (
    <div className="home-page">
      <div className={parentContainerClassName}>
        <div className="home-page-wrapper">
          <div className="home-page-flex-container">
            <div className="home-page-body-container">
              <div className="home-page-body-header-container">
                <div className="home-page-body-header">
                  <p className="home-page-body-header-icon-container">
                    <img
                      className="home-page-body-header-icon"
                      src={MainLogo}
                      alt="main_logo"
                    />
                  </p>
                  <h4>{AI_NAME}</h4>
                </div>
                <div className="home-page-body-header">
                  <p
                    onClick={handleLogout}
                    className="red-color cursor-pointer">
                    Log out
                  </p>
                </div>
              </div>
              <div
                ref={chatBodyContainerRef}
                className="home-page-mainbody-container home-page-chatbody-container dark-bg-color">
                <div className="home-page-mainbody-wrapper">
                  <ShowChatWrappers
                    uniqueKey={"chats"}
                    chats={chats}
                  />
                </div>
              </div>
              <div className="home-page-chat-container dark-bg-color">
                <TextInput
                  onEnter={handleOnSendMessage}
                  ref={chatInputRef}
                  className="home-page-chat-textinput light-color darker-bg-color max-width"
                  placeholder={loading ? "Loading..." : ""}
                  readOnly={loading}
                />
                <Button
                  className={
                    loading ? "hidden no-width" : "visible"
                  }
                  onClick={handleOnSendMessage}>
                  <span className="text-ellipsis">
                    Send
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
