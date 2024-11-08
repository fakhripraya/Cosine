/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { Fragment, useEffect, useRef } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PageLoading from "../PageLoading";
import {
  INITIAL_PINTRAIL_MESSAGE,
  PAGE_LOADING_MESSAGE,
} from "../../variables/constants/home";
import TextInput from "../../components/TextInput";
import ShowChatWrappers from "./modular/ShowChatWrappers";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  IChatData,
  OneToOneChat,
} from "../../interfaces/chat";
import { cookies } from "../../config/cookie";
import {
  HERMES_SERVICE,
  OLYMPUS_SERVICE,
} from "../../config/environment";
import { URL_POST_GOOGLE_CALLBACK } from "../../config/xhr/routes/credentials";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  X_SID,
} from "../../variables/global";
import {
  clearAllUrlParameters,
  handleError,
  removeTrailingNewlines,
} from "../../utils/functions/global";
import { URL_POST_AGENT_MESSAGING } from "../../config/xhr/routes/home";
import db from "../../config/dexie/dexie";
import moment from "moment";
import { ICookieInfo } from "../../interfaces/credential";
import { v4 as uuidv4 } from "uuid";
import {
  AI_ID,
  AI_NAME,
  AI_PROFILE_PIC_URL,
} from "../../variables/constants/ai";
import { IBuildingDetails } from "../../interfaces/building";
import { BuildingDetailsDTO } from "../../dtos/building";
import {
  AdvanceAxiosRequestHeaders,
  isIResponseObject,
} from "../../interfaces/axios";
import { IS_NOT_AUTHENTICATE } from "../../utils/validations/credential";
import HamburgerIcon from "../../assets/svg/ic_hamburg_3.svg";
import { createChatData } from "../../utils/functions/db";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/useRedux";
import {
  setChats,
  setLoading,
  setRendered,
  setSavedLocations,
  setShowMobileSidebar,
  setShowSidebar,
  setUser,
} from "../../redux/reducers/pages/home/index.ts";
import {
  MobileSidebar,
  Sidebar,
} from "./modular/ShowSidebar";
import { MessagingDTO } from "../../dtos/messaging";
import ShowHeader from "./modular/ShowHeader";
import { ShowTopUp } from "./modular/ShowModal";
import { SESSION_EXPIRED } from "../../variables/errorMessages/credential.ts";

export default function Home() {
  // REFS //
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyContainerRef = useRef<HTMLDivElement>(null);

  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();

  // STATES //
  const {
    user,
    rendered,
    showSidebar,
    showMobileSidebar,
    isLoading,
    chats,
  } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  // VARIABLES //
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";
  const parentContainerClassName = rendered
    ? "visible home-page-container"
    : "hidden no-height";
  const chatContainerClassName = showSidebar
    ? ""
    : "max-width full-width";
  const chatButtonSendClassName = isLoading
    ? "hidden no-width"
    : "visible";
  const chatTextboxClassName = isLoading
    ? "Loading..."
    : "";

  // FUNCTIONS //
  const handleInitialize = async () => {
    try {
      let loggedUser = null;
      const clientUserInfo = cookies.get(CLIENT_USER_INFO);
      const searchParamScopes = window.location.search;

      if (clientUserInfo?.user) {
        dispatch(setUser(clientUserInfo.user));
        loggedUser = clientUserInfo.user;
        clearAllUrlParameters();
      } else if (
        searchParamScopes?.includes("googleapis")
      ) {
        const scopes = searchParamScopes;
        clearAllUrlParameters();
        loggedUser = await handleGoogleAuthListener(scopes);
      }

      const { chatDatas, locationDatas } =
        await db.transaction(
          "rw",
          [db.chat_data, db.user_saved_location_data],
          async () => {
            const chatDatas = await db.chat_data
              .filter(
                (chat) =>
                  chat.sender.id === loggedUser?.userId ||
                  (chat.sender.id === AI_ID &&
                    chat.content.sendSpecificToId ===
                      loggedUser?.userId)
              )
              .sortBy("timestamp");

            const locationDatas =
              await db.user_saved_location_data
                .filter(
                  (location) =>
                    location.userId === loggedUser?.userId
                )
                .sortBy("timestamp");

            return {
              chatDatas: chatDatas,
              locationDatas: locationDatas,
            };
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

      const initData = createChatData(initMessage);
      chatDatas.push(initData);
      dispatch(setChats(chatDatas));
      dispatch(setSavedLocations(locationDatas));
    } catch (error) {
      console.error("Failed to initialize:", error);
    } finally {
      dispatch(setRendered(true));
    }
  };

  const handleOnSendMessage = async () => {
    try {
      if (isLoading)
        return window.alert("Sabar lagi loading nih !");
      if (!user) return navigate("/login");
      if (chatInputRef.current?.value !== "") {
        dispatch(setLoading(true));
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

        const userChatData: IChatData =
          createChatData(userMessage);

        const temp: IChatData[] = [...chats];
        temp.push(userChatData);
        dispatch(setChats(temp));

        handleOnMessageSaving(userChatData, timeNow);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnMessageSaving = async (
    userChatData: IChatData,
    timeNow: string
  ) => {
    try {
      const abortController = new AbortController();
      const axiosTimeout = axiosService.setAxiosTimeout(
        abortController,
        120000
      );

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
            clientUserInfo?.credentialToken.refreshToken,
        },
        controller: abortController,
      });
      clearTimeout(axiosTimeout);

      const messagingOutput: MessagingDTO = {
        ...response.responseData,
        output_content: JSON.parse(
          response.responseData.output_content
        ),
      };
      const aiMessage: OneToOneChat = {
        id: uuidv4(),
        chatContent: removeTrailingNewlines(
          messagingOutput?.output
        ),
        senderId: AI_ID,
        senderFullName: AI_NAME,
        sendSpecificToId: user?.userId,
        senderProfilePictureUri: AI_PROFILE_PIC_URL,
        createdAt: timeNow,
      };

      const parsedContent:
        | BuildingDetailsDTO[]
        | undefined = messagingOutput?.output_content;

      const buildingContents = parsedContent?.map(
        (obj): IBuildingDetails => {
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

      const aiChatData: IChatData = createChatData(
        aiMessage,
        buildingContents
      );

      const temp: IChatData[] = [...chats];
      temp.push(userChatData);
      temp.push(aiChatData);
      dispatch(setChats(temp));

      await db.transaction("rw", db.chat_data, () => {
        db.chat_data.bulkAdd([userChatData, aiChatData]);
      });
    } catch (error) {
      if (
        isIResponseObject(error) &&
        IS_NOT_AUTHENTICATE(error)
      ) {
        cookies.remove(CLIENT_USER_INFO, { path: "/" });
        dispatch(setUser(null));
        alert(SESSION_EXPIRED);
        return navigate("/login");
      }
      handleError(error);
    } finally {
      dispatch(setLoading(false));
    }
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
      dispatch(setUser(loggedUser));
      cookies.set(CLIENT_USER_INFO, result.responseData);

      return loggedUser;
    } catch (error) {
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
      handleError(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    handleInitialize();
  }, []);

  // Scroll to the bottom of the chat body container
  useEffect(() => {
    const current = chatBodyContainerRef.current;
    if (current) current.scrollTop = current.scrollHeight;
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

  return (
    <Fragment>
      <ShowTopUp />
      <div className="home-page">
        <div className={parentContainerClassName}>
          <div className="home-page-wrapper">
            <div className="home-page-flex-container">
              <Sidebar />
              <MobileSidebar />
              <div
                className={`home-page-body-container ${chatContainerClassName}`}>
                <div className="home-page-body-header-container">
                  <div className="home-page-body-header">
                    <p className="home-page-body-header-icon-container">
                      {!showSidebar && (
                        <img
                          onClick={() =>
                            dispatch(setShowSidebar(true))
                          }
                          className="home-page-body-header-icon hide-on-mobile-flex cursor-pointer"
                          src={HamburgerIcon}
                          alt="hamburger-icon-header"
                        />
                      )}
                      {!showMobileSidebar && (
                        <img
                          onClick={() =>
                            dispatch(
                              setShowMobileSidebar(true)
                            )
                          }
                          className="home-page-body-header-icon show-on-mobile-flex cursor-pointer"
                          src={HamburgerIcon}
                          alt="hamburger-icon-header"
                        />
                      )}
                    </p>
                    <h4>{AI_NAME}</h4>
                  </div>
                  <ShowHeader user={user} />
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
                    placeholder={chatTextboxClassName}
                    readOnly={
                      isLoading || showMobileSidebar
                    }
                  />
                  <Button
                    className={chatButtonSendClassName}
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
    </Fragment>
  );
}
