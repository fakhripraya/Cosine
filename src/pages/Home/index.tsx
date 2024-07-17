/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import ErrorHandling from "../ErrorHandling/index";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PageLoading from "../PageLoading";
import { PAGE_LOADING_MESSAGE } from "../../variables/constants/home";
import { USER_NOT_FOUND } from "../../variables/errorMessages/home";
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
import { URL_POST_GOOGLE_CALLBACK } from "../../config/xhr/routes/credentials";
import { CLIENT_USER_INFO } from "../../variables/global";
import {
  clearAllUrlParameters,
  removeTrailingNewlines,
} from "../../utils/functions/global";
import { URL_POST_COSINE_MESSAGING } from "../../config/xhr/routes/home";
import db from "../../config/dexie/dexie";
import moment from "moment";
import { IUserData } from "../../interfaces/credential";
import { v4 as uuidv4 } from "uuid";
import {
  AI_ID,
  AI_NAME,
} from "../../variables/constants/ai";
import { BuildingDetails } from "../../interfaces/building";
import { BuildingDetailsDTO } from "../../dtos/building";
import { abortController } from "../../config/xhr/axios";
import { isIResponseObject } from "../../interfaces/axios";

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

      if (clientUserInfo?.user)
        setUser(clientUserInfo.user);
      else if (searchParamScopes?.includes("googleapis"))
        await handleGoogleAuthListener(searchParamScopes);

      const allChatData = await db.transaction(
        "rw",
        db.chat_data,
        async () => {
          return await db.chat_data
            .orderBy("timestamp")
            .toArray();
        }
      );

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
          senderProfilePictureUri: "",
          createdAt: timeNow,
        };
        chatInputRef.current!.value = "";

        const chatData: IChatData = {
          id: uuidv4(),
          sender: {
            id: userMessage.senderId,
            fullName: userMessage.senderFullName,
            profilePictureURI:
              userMessage.senderProfilePictureUri,
          },
          content: userMessage,
          timestamp: new Date().toISOString(),
        };

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
    const axiosTimeout =
      axiosService.setAxiosTimeout(abortController);

    try {
      const response = await axiosService.postData({
        endpoint: HERMES_SERVICE,
        url: `${URL_POST_COSINE_MESSAGING}`,
        data: {
          sessionId: userChatData.sender.id,
          content: userChatData.content.chatContent,
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
        senderProfilePictureUri: "",
        createdAt: timeNow,
      };

      const parsedContent: BuildingDetailsDTO[] =
        JSON.parse(response.responseData?.output_content);

      const building_contents = parsedContent?.map(
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

      const chatData: IChatData = {
        id: uuidv4(),
        sender: {
          id: aiMessage.id,
          fullName: aiMessage.senderFullName,
          profilePictureURI:
            aiMessage.senderProfilePictureUri,
        },
        content: aiMessage,
        building_contents: building_contents,
        timestamp: new Date().toISOString(),
      };

      setChats((record) => {
        const temp: IChatData[] = [...record];
        temp.push(chatData);
        return temp;
      });

      await db.transaction("rw", db.chat_data, () => {
        db.chat_data.bulkAdd([userChatData, chatData]);
      });
    } catch (error) {
      console.log(error);
      if (isIResponseObject(error))
        return alert(error.errorContent);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuthListener = async (
    queryString: string
  ) => {
    try {
      const axiosTimeout =
        axiosService.setAxiosTimeout(abortController);

      const result = await axiosService.postData({
        endpoint: OLYMPUS_SERVICE,
        url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
        controller: abortController,
      });

      clearTimeout(axiosTimeout);

      let loggedUser: any | undefined = undefined;
      cookies.set(CLIENT_USER_INFO, result.responseData);
      loggedUser = result.responseData.user;
      setUser(loggedUser);
      clearAllUrlParameters();
    } catch (error) {
      console.log(error);
      alert(error);
      navigate("/login");
    }
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
      />
    );
  }

  if (rendered && !user) {
    return (
      <ErrorHandling errorMessage={USER_NOT_FOUND}>
        <Button
          className="margin-top-12-18 "
          onClick={() => navigate("/login")}>
          Login
        </Button>
      </ErrorHandling>
    );
  }

  return (
    <div className="creative-store">
      <div className={parentContainerClassName}>
        <div className="home-page-wrapper">
          <div className="home-page-flex-container">
            <div className="home-page-body-container">
              <div className="home-page-body-header-container">
                <div className="home-page-body-header-left">
                  <h4>{AI_NAME}</h4>
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
                  <label className="text-ellipsis">
                    Send
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
