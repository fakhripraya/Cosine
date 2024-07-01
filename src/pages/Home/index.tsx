import { useRef, useState } from "react";
import ErrorHandling from "../ErrorHandling/index";
import Button from "../../components/Button";
import { useSearchParams } from "react-router-dom";
import PageLoading from "../PageLoading";
import { PAGE_LOADING_MESSAGE } from "../../variables/constants/home";
import { USER_NOT_FOUND } from "../../variables/errorMessages/home";
import TextInput from "../../components/TextInput";
import ShowChatWrappers from "./modular/ShowChatWrappers";
import { useAxios } from "../../utils/hooks/useAxios";
import "./style.scss";
import axios from "axios";
import { IChatData } from "../../interfaces/home";

export default function Home() {
  // REFS //
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatBodyContainerRef = useRef<HTMLDivElement>(null);

  // HOOKS //
  const axiosService = useAxios();
  const [searchParams] = useSearchParams();

  // STATES //
  const [userId] = useState<string | null>(
    searchParams.get("user-id")
  );
  const [rendered, setRendered] = useState<boolean>(true);
  const [chatPagination, setChatPagination] =
    useState<number>(0);
  const [chats, setChats] = useState<
    Record<string, IChatData>
  >({});
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES //
  const pageLoadingClassName = rendered
    ? "hidden no-height"
    : "visible";
  const parentContainerClassName = rendered
    ? "visible creative-store-container"
    : "hidden no-height";

  // FUNCTIONS //
  async function handleInitialize() {
    let result;

    try {
      // check if the user has logged in
      // if user does logged in, check whether they're a member of the store or not
      // if they're not a member, redirect them to the consent screen
      if (IS_OTP_VERIFIED(login)) {
        const check =
          await axios.getDataWithOnRequestInterceptors(
            {
              endpoint: process.env.REACT_APP_ZEUS_SERVICE,
              url: `${URL_POST_GET_USER_STORE_MEMBERSHIPS(
                login?.user?.userId
              )}?storeId=${storeId}`,
            },
            async () => {
              const result = await checkAuthAndRefresh(
                zeusService,
                cookies
              );

              return result;
            }
          );

        // redirect if true
        if (check.responseData.length === 0)
          return navigate(
            `/creative-store/consent-screen?id=${storeId}`
          );
        else handleGetUserRoles();
      }

      result = await zeusService.getData({
        endpoint: process.env.REACT_APP_ZEUS_SERVICE,
        url: `${URL_GET_STORE_INFO}?storeId=${storeId}`,
      });
    } catch (error) {
      if (error.responseStatus === 404) {
        chatSocket.disconnect();
        webRTCSocket.disconnect();
        return setStoreId(null);
      } else handleModalError(error);
    }

    // if we got the value and its not and error, map it
    const initialMappedChannels =
      result.responseData.MasterStoreChannels.sort(
        (a, b) => a.channelsOrder - b.channelsOrder
      ).reduce((acc, value) => {
        return {
          ...acc,
          ...value.channelsJSON,
        };
      }, {});

    // set the store info
    // render all the left panel datas
    // and set the initial joined chat room
    // also handle the purchase orders render here
    setStoreInfo(result.responseData);
    handlePurchaseOrdersRender(CREATIVE_STORE_DUMMY_PO);
    handleInitialChannelsRender(initialMappedChannels);
    const joinedChatRoom = handleInitialJoinChatRoom(
      initialMappedChannels
    );

    if (result.responseStatus === 200) {
      try {
        const chats =
          await chatSignaler.getChatFromDatabase(
            joinedChatRoom
          );
        // render currently joined chat room body
        // and set render to true so the page can exit the loading screen
        handleChatsRender(chats);
        setRendered(true);
      } catch (e) {
        console.error(e.stack || e);
      }
    }
  }

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
