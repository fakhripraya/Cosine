/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import ErrorHandling from "../ErrorHandling/index";
import Button from "../../components/Button";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import PageLoading from "../PageLoading";
import { PAGE_LOADING_MESSAGE } from "../../variables/constants/home";
import { USER_NOT_FOUND } from "../../variables/errorMessages/home";
import TextInput from "../../components/TextInput";
import ShowChatWrappers from "./modular/ShowChatWrappers";
import { useAxios } from "../../utils/hooks/useAxios";
import { IChatData } from "../../interfaces/home";
import { cookies } from "../../config/cookie";
import { trackPromise } from "react-promise-tracker";
import { OLYMPUS_SERVICE } from "../../config/environment";
import { URL_POST_GOOGLE_CALLBACK } from "../../config/xhr/routes/credentials";
import { CLIENT_USER_INFO } from "../../variables/global";
import {
  clearAllUrlParameters,
  setURLParams,
} from "../../utils/functions/global";

export default function Home() {
  // REFS //
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyContainerRef = useRef<HTMLDivElement>(null);

  // HOOKS //
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [searchParams] = useSearchParams();

  // STATES //
  const [userId, setUserId] = useState<string | null>(
    searchParams.get("userId")
  );
  const [rendered, setRendered] = useState<boolean>(false);
  const [chats] = useState<Record<string, IChatData>>({});

  // VARIABLES //
  const urlParams = new URLSearchParams(
    window.location.search
  );
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";
  const parentContainerClassName = rendered
    ? "visible creative-store-container"
    : "hidden no-height";

  // FUNCTIONS //
  async function handleInitialize() {
    const searchParamScopes = searchParams.get("scope");
    if (searchParamScopes?.includes("googleapis"))
      await handleGoogleAuthListener();

    setRendered(true);
  }

  const handleOnSendMessage = () => {};

  async function handleGoogleAuthListener() {
    const queryString = window.location.search;
    let loggedUser: any | undefined = undefined;
    trackPromise(
      axiosService
        .postData({
          endpoint: OLYMPUS_SERVICE,
          url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData
          );

          loggedUser = result.responseData.user;
          setUserId(loggedUser.userId);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          clearAllUrlParameters();
          setURLParams(
            urlParams,
            "userId",
            loggedUser.userId
          );
        })
    );
  }

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

  if (!userId && rendered) {
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
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
