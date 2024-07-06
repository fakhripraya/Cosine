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
    ? "visible creative-store-container"
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
          building_contents: "",
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
      senderId: "Cosine",
      senderFullName: "Cosine",
      senderProfilePictureUri: "",
      createdAt: timeNow,
    };

    const isHasContent =
      response.responseData?.output_content.length > 0;
    const chatData: IChatData = {
      sender: {
        id: aiMessage.id,
        fullName: aiMessage.senderFullName,
        profilePictureURI:
          aiMessage.senderProfilePictureUri,
      },
      content: aiMessage,
      building_contents:
        isHasContent &&
        response.responseData?.output_content,
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

    await db.transaction("rw", db.chat_data, async () => {
      await db.chat_data.bulkAdd([userChatData, chatData]);
    });

    setLoading(false);
  };

  const handleGoogleAuthListener = async (
    queryString: string
  ) => {
    await axiosService
      .postData({
        endpoint: OLYMPUS_SERVICE,
        url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
      })
      .then((result) => {
        let loggedUser: any | undefined = undefined;
        cookies.set(CLIENT_USER_INFO, result.responseData);
        loggedUser = result.responseData.user;
        setUser(loggedUser);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        clearAllUrlParameters();
      });
  };

  useEffect(() => {
    handleInitialize();
  }, []);

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
        <div className="creative-store-wrapper">
          <div className="creative-store-flex-container">
            <div className="creative-store-body-container">
              <div className="creative-store-body-header-container">
                <div className="creative-store-body-header-left">
                  <h4>Cosine AI</h4>
                </div>
              </div>
              <div
                ref={chatBodyContainerRef}
                className="creative-store-mainbody-container creative-store-chatbody-container dark-bg-color">
                <div className="creative-store-mainbody-wrapper">
                  <ShowChatWrappers
                    uniqueKey={"chats"}
                    chats={chats}
                  />
                </div>
              </div>
              <div className="creative-store-chat-container dark-bg-color">
                <TextInput
                  onEnter={handleOnSendMessage}
                  ref={chatInputRef}
                  className="creative-store-chat-textinput light-color darker-bg-color"
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
