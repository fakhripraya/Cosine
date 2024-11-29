import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { cookies } from "../../../config/cookie";
import { HERMES_SERVICE } from "../../../config/environment";
import {
  URL_POST_AGENT_MESSAGING,
  URL_POST_CLEAR_MESSAGE_HISTORY,
} from "../../../config/xhr/routes/home";
import {
  AdvanceAxiosRequestHeaders,
  IAxiosService,
  IResponseObject,
  isIResponseObject,
} from "../../../interfaces/axios";
import { IUserData } from "../../../interfaces/credential";
import {
  setShowErrorMessage,
  setUser,
} from "../../../redux/reducers/pages/home";
import { IS_NOT_AUTHENTICATE } from "../../../utils/validations/credential";
import { SESSION_EXPIRED } from "../../../variables/errorMessages/credential";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  X_SID,
} from "../../../variables/global";
import { NavigateFunction } from "react-router-dom";
import { IChatData } from "../../../interfaces/chat";
import { ResponseError } from "../../../classes/error";

export const handlePostClearMessageHistory = async (
  user: IUserData,
  axiosService: IAxiosService,
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
  const clientUserInfo = cookies.get(CLIENT_USER_INFO);
  const abortController = new AbortController();
  const axiosTimeout =
    axiosService.setAxiosTimeout(abortController);
  await axiosService
    .postData({
      headers: {
        [AUTHORIZATION]:
          `Bearer ${clientUserInfo.credentialToken.accessToken}` ||
          "",
        [X_SID]: clientUserInfo.sid || "",
      } as unknown as AdvanceAxiosRequestHeaders,
      endpoint: HERMES_SERVICE,
      url: URL_POST_CLEAR_MESSAGE_HISTORY,
      data: {
        sessionId: user?.userId,
      },
      controller: abortController,
    })
    .catch((error: IResponseObject) => {
      if (
        isIResponseObject(error) &&
        IS_NOT_AUTHENTICATE(error)
      ) {
        cookies.remove(CLIENT_USER_INFO, { path: "/" });
        dispatch(setUser(null));
        alert(SESSION_EXPIRED);
        return navigate("/login");
      } else {
        dispatch(
          setShowErrorMessage({
            isError: error.responseError,
            errorContent: error.errorContent,
          })
        );
      }
    })
    .finally(() => clearTimeout(axiosTimeout));
};

export const handlePostSendAgentMessaging = async (
  chatData: IChatData,
  axiosService: IAxiosService
) => {
  const clientUserInfo = cookies.get(CLIENT_USER_INFO);
  const abortController = new AbortController();
  const axiosTimeout = axiosService.setAxiosTimeout(
    abortController,
    120000
  );
  const response = await axiosService
    .postData({
      endpoint: HERMES_SERVICE,
      url: URL_POST_AGENT_MESSAGING,
      headers: {
        [AUTHORIZATION]:
          `Bearer ${clientUserInfo?.credentialToken.accessToken}` ||
          "",
        [X_SID]: clientUserInfo?.sid || "",
      } as unknown as AdvanceAxiosRequestHeaders,
      data: {
        sessionId: chatData.sender.id,
        content: chatData.content.chatContent,
      },
      controller: abortController,
    })
    .then((result: IResponseObject) => result)
    .catch((error: IResponseObject) => {
      return Promise.reject(new ResponseError(error));
    })
    .finally(() => clearTimeout(axiosTimeout));

  return response;
};
