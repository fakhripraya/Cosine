/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PageLoading from "../PageLoading";
import TextInput from "../../components/TextInput";
import ShowChatWrappers from "./modular/ShowChatWrappers";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  IChatData,
  IChatLoading,
  OneToOneChat,
} from "../../interfaces/chat";
import { cookies } from "../../config/cookie";
import { CLIENT_USER_INFO } from "../../variables/global";
import {
  clearAllUrlParameters,
  handleException,
  removeTrailingNewlines,
} from "../../utils/functions/global";
import db from "../../config/dexie/dexie";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  AI_ID,
  AI_NAME,
  AI_PROFILE_PIC_URL,
} from "../../variables/constants/ai";
import { IBuildingDetails } from "../../interfaces/building";
import { BuildingDetailsDTO } from "../../dtos/building/index.ts";
import { isIResponseObject } from "../../interfaces/axios";
import { IS_NOT_AUTHENTICATE } from "../../utils/validations/credential";
import HamburgerIcon from "../../assets/svg/ic_hamburg_3.svg";
import {
  addPintrailNoteChatData,
  createChatData,
} from "../../utils/functions/db";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/useRedux";
import {
  setBalance,
  setChats,
  setChatLoading,
  setRendered,
  setSavedLocations,
  setShowMobileSidebar,
  setShowSidebar,
  setShowTopUpMenu,
  setUser,
  setUserGeolocation,
} from "../../redux/reducers/pages/home/index.ts";
import {
  MobileSidebar,
  Sidebar,
} from "./modular/ShowSidebar";
import { MessagingDTO } from "../../dtos/messaging/index.ts";
import ShowHeader from "./modular/ShowHeader";
import { ShowTopUp } from "./modular/ShowModal";
import { SESSION_EXPIRED } from "../../variables/errorMessages/credential.ts";
import { handlePostSendAgentMessaging } from "../../services/home/POST/index.ts";
import { ResponseError } from "../../classes/error/index.ts";
import { handlePostGoogleAuthListener } from "../../services/credentials/POST/index.ts";
import { handleGetBalanceAmount } from "../../services/balance/GET/index.ts";
import ShowChatWrapper from "./modular/ShowChatWrapper.tsx";

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
    showPageLoadingMessage,
    chatLoading,
    chats,
    balance,
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
  const chatButtonSendClassName = chatLoading.isLoading
    ? "hidden no-width"
    : "button-outlined cursor-pointer";

  // FUNCTIONS //
  const handleInitialize = async () => {
    try {
      let loggedUser = null;
      const clientUserInfo = cookies.get(CLIENT_USER_INFO);
      const searchParamScopes = window.location.search;

      try {
        if (clientUserInfo?.user) {
          dispatch(setUser(clientUserInfo.user));
          loggedUser = clientUserInfo.user;
          clearAllUrlParameters();
        } else if (
          searchParamScopes?.includes("googleapis")
        ) {
          const scopes = searchParamScopes;
          clearAllUrlParameters();
          loggedUser = await handlePostGoogleAuthListener(
            scopes,
            axiosService,
            dispatch,
            navigate
          );
        }
      } finally {
        const storedClientUserInfo = cookies.get(
          CLIENT_USER_INFO
        );
        if (storedClientUserInfo) {
          await handleGetBalanceAmount(
            axiosService,
            dispatch,
            navigate
          );
        }

        if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser");
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              dispatch(setUserGeolocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }));
            },
            (err) => {
              alert(`Error: ${err.message}`);
            }
          );
        }
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

      const added = addPintrailNoteChatData(
        user,
        chatDatas
      );
      dispatch(setChats(added));
      dispatch(setSavedLocations(locationDatas));
    } catch (error) {
      handleException(error);
    } finally {
      dispatch(setRendered(true));
    }
  };

  const handleOnSendMessage = async () => {
    try {
      if (chatLoading.isLoading)
        return window.alert("Sabar lagi loading nih !");
      if (!user) return navigate("/login");
      if (balance <= 0)
        return dispatch(setShowTopUpMenu(true));
      if (chatInputRef.current?.value !== "") {
        const tempChatLoading: IChatLoading = {
          ...chatLoading,
          isLoading: true
        }
        dispatch(setChatLoading(tempChatLoading));
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
      const response = await handlePostSendAgentMessaging(
        userChatData,
        axiosService
      );

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
      dispatch(
        setBalance(messagingOutput.remaining_balance)
      );

      await db.transaction("rw", db.chat_data, () => {
        db.chat_data.bulkAdd([userChatData, aiChatData]);
      });
    } catch (error) {
      if (error instanceof ResponseError)
        handleException(error.response);
      if (
        isIResponseObject(error) &&
        IS_NOT_AUTHENTICATE(error)
      ) {
        cookies.remove(CLIENT_USER_INFO, { path: "/" });
        dispatch(setUser(null));
        alert(SESSION_EXPIRED);
        return navigate("/login");
      }
    } finally {
      const tempChatLoading: IChatLoading = {
        ...chatLoading,
        isLoading: false
      }
      dispatch(setChatLoading(tempChatLoading));
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

  // Handle Chat Loading
  useEffect(() => {
    if(chatLoading.isLoading){
      let dotCount = 0;
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // increment first
        const tempChatLoading: IChatLoading = {
          loadingChatData: {
            ...chatLoading.loadingChatData,
            sender: {
              ...chatLoading.loadingChatData.sender,
              fullName: `Pintrail sedang berfikir${".".repeat(dotCount)}`
            }
          },
          isLoading: true
        }

        dispatch(setChatLoading(tempChatLoading))
      }, 500);
      return () => clearInterval(interval);
    }
  }, [chatLoading.isLoading]);

  // Placeholder message while redirecting to home page
  if (!rendered) {
    return (
      <PageLoading
        className={pageLoadingClassName}
        loadingMessage={showPageLoadingMessage}
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
                  className="home-page-mainbody-container home-page-chatbody-container transparent-bg-color">
                  <div className="home-page-mainbody-wrapper">
                    <ShowChatWrappers
                      uniqueKey={"chats"}
                      chats={chats}
                    />
                    {chatLoading.isLoading && <ShowChatWrapper chat={chatLoading.loadingChatData}/>}
                  </div>
                </div>
                <div className="home-page-chat-container dark-bg-color">
                  <TextInput
                    onEnter={handleOnSendMessage}
                    ref={chatInputRef}
                    className="home-page-chat-textinput light-color darker-bg-color max-width"
                    readOnly={
                      chatLoading.isLoading || showMobileSidebar
                    }
                  />
                  <Button
                    className={chatButtonSendClassName}
                    onClick={handleOnSendMessage}>
                    <span className="text-ellipsis main-color">
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
