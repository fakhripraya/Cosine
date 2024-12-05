import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { cookies } from "../../../config/cookie";
import {
  ARES_SERVICE,
  ARES_SERVICE_API_KEY,
} from "../../../config/environment";
import { URL_GET_BALANCE_AMOUNT } from "../../../config/xhr/routes/balance";
import {
  AdvanceAxiosRequestHeaders,
  IAxiosService,
  IResponseObject,
  isIResponseObject,
} from "../../../interfaces/axios";
import {
  setBalance,
  setShowErrorMessage,
  setShowPageLoadingMessage,
  setUser,
} from "../../../redux/reducers/pages/home";
import { IS_NOT_AUTHENTICATE } from "../../../utils/validations/credential";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  X_ARES_API_KEY,
  X_SID,
} from "../../../variables/global";
import { NavigateFunction } from "react-router-dom";
import { SESSION_EXPIRED_LOADING_MESSAGE } from "../../../variables/constants/home";

export const handleGetBalanceAmount = async (
  axiosService: IAxiosService,
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
  const clientUserInfo = cookies.get(CLIENT_USER_INFO);
  const abortController = new AbortController();
  const axiosTimeout =
    axiosService.setAxiosTimeout(abortController);
  await axiosService
    .getData({
      headers: {
        [AUTHORIZATION]:
          `Bearer ${clientUserInfo.credentialToken.accessToken}` ||
          "",
        [X_SID]: clientUserInfo.sid || "",
        [X_ARES_API_KEY]: ARES_SERVICE_API_KEY,
      } as unknown as AdvanceAxiosRequestHeaders,
      endpoint: ARES_SERVICE,
      url: URL_GET_BALANCE_AMOUNT,
      controller: abortController,
    })
    .then((result: IResponseObject) => {
      dispatch(setBalance(result.responseData.balance));
    })
    .catch((error: IResponseObject) => {
      if (
        isIResponseObject(error) &&
        IS_NOT_AUTHENTICATE(error)
      ) {
        cookies.remove(CLIENT_USER_INFO, { path: "/" });
        dispatch(setUser(null));
        dispatch(
          setShowPageLoadingMessage(
            SESSION_EXPIRED_LOADING_MESSAGE
          )
        );
        return navigate("/login");
      } else {
        dispatch(
          setShowErrorMessage({
            isError: error.responseError,
            errorContent: error.errorContent,
          })
        );
        dispatch(setBalance(0));
      }
    })
    .finally(() => clearTimeout(axiosTimeout));
};
