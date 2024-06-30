import { useRef, useState } from "react";
import ErrorHandling from "../ErrorHandling/index";
import Button from "../../components/Button";
import { useSearchParams } from "react-router-dom";
import PageLoading from "../PageLoading";
import { PAGE_LOADING_MESSAGE } from "../../variables/constants/home";
import { USER_NOT_FOUND } from "../../variables/errorMessages/home";
import FloatButton from "../../components/FloatButton";
import TextInput from "../../components/TextInput";
import ShowChatWrappers from "./modular/ShowChatWrappers";
import { useAxios } from "../../utils/hooks/useAxios";

export default function Home() {
  // REFS //
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyContainerRef = useRef<HTMLDivElement>(null);

  const axiosService = useAxios();

  const [searchParams] = useSearchParams();

  // STATES //
  const [userId, setUserId] = useState(
    searchParams.get("user-id")
  );
  const [rendered, setRendered] = useState(false);
  const [chatPagination, setChatPagination] = useState(0);
  const [chats, setChats] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES //
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";
  const parentContainerClassName = rendered
    ? "visible creative-store-container"
    : "hidden no-height";

  // FUNCTIONS //
  const handleOnSendMessage = () => {};

  // Placeholder message while redirecting to home page
  if (!userId) {
    return (
      <ErrorHandling errorMessage={USER_NOT_FOUND}>
        <Button
          className="margin-top-12-18 "
          onClick={() => (window.location.href = "/")}>
          Login
        </Button>
      </ErrorHandling>
    );
  }

  return (
    <div className="creative-store">
      <PageLoading
        className={pageLoadingClassName}
        loadingMessage={PAGE_LOADING_MESSAGE}
      />
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
                <FloatButton
                  onClick={() => {}}
                  className="creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-emoji"
                />
                <FloatButton
                  onClick={() => {}}
                  className="creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-gif"
                />
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
