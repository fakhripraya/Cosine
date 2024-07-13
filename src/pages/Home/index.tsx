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
  const [chats, setChats] = useState<
    Record<string, IChatData>
  >({});

  // VARIABLES //
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";
  const parentContainerClassName = rendered
    ? "visible home-page-container"
    : "hidden no-height";

  // FUNCTIONS //
  const handleInitialize = async () => {
    const clientUserInfo = cookies.get(CLIENT_USER_INFO);
    if (clientUserInfo?.user) {
      setUser(clientUserInfo.user);
      return setRendered(true);
    }

    const searchParamScopes = window.location.search;
    if (searchParamScopes?.includes("googleapis"))
      await handleGoogleAuthListener(searchParamScopes);

    setRendered(true);
  };

  const handleOnSendMessage = async () => {
    try {
      if (loading) return window.alert("sabar lg loading");
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
          sender: {
            id: userMessage.id,
            fullName: userMessage.senderFullName,
            profilePictureURI:
              userMessage.senderProfilePictureUri,
          },
          content: userMessage,
        };

        setChats((record) => {
          let temp: Record<string, IChatData> = {
            ...record,
          };

          temp = {
            ...temp,
            [uuidv4()]: chatData,
          };

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
    const response = await axiosService.postData({
      endpoint: HERMES_SERVICE,
      url: `${URL_POST_COSINE_MESSAGING}`,
      data: {
        content: userChatData.content.chatContent,
      },
    });

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

    const parsedContent: BuildingDetails[] = JSON.parse(
      response.responseData?.output_content
    );
    const isHasContent = parsedContent.length > 0;
    const building_contents = isHasContent
      ? parsedContent
      : undefined;

    const chatData: IChatData = {
      sender: {
        id: aiMessage.id,
        fullName: aiMessage.senderFullName,
        profilePictureURI:
          aiMessage.senderProfilePictureUri,
      },
      content: aiMessage,
      building_contents: building_contents,
    };

    console.log(chatData);

    setChats((record) => {
      let temp: Record<string, IChatData> = {
        ...record,
      };

      temp = {
        ...temp,
        [uuidv4()]: chatData,
      };

      return temp;
    });

    await db.transaction("rw", db.chat_data, () => {
      db.chat_data.bulkAdd([userChatData, chatData]);
    });

    setLoading(false);
  };

  const handleGoogleAuthListener = async (
    queryString: string
  ) => {
    try {
      const result = await axiosService.postData({
        endpoint: OLYMPUS_SERVICE,
        url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
      });

      let loggedUser: any | undefined = undefined;
      cookies.set(CLIENT_USER_INFO, result.responseData);
      loggedUser = result.responseData.user;
      setUser(loggedUser);
      clearAllUrlParameters();
    } catch (error) {
      console.log(error);
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
                  className="home-page-chat-textinput light-color darker-bg-color"
                />
                <Button onClick={handleOnSendMessage}>
                  {loading ? "Loading..." : "Send"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
