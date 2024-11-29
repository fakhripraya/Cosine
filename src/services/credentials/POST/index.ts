import { NavigateFunction } from "react-router-dom";
import { cookies } from "../../../config/cookie";
import { OLYMPUS_SERVICE } from "../../../config/environment";
import {
  URL_POST_GOOGLE_CALLBACK,
  URL_POST_LOGOUT,
} from "../../../config/xhr/routes/credentials";
import {
  AdvanceAxiosRequestHeaders,
  IAxiosService,
} from "../../../interfaces/axios";
import { IUserData } from "../../../interfaces/credential";
import { setUser } from "../../../redux/reducers/pages/home";
import { handleException } from "../../../utils/functions/global";
import {
  CLIENT_USER_INFO,
  X_SID,
} from "../../../variables/global";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { trackPromise } from "react-promise-tracker";

export const handlePostGoogleAuthListener = async (
  queryString: string,
  axiosService: IAxiosService,
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
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

    let loggedUser: IUserData | undefined = undefined;
    loggedUser = result.responseData.user;
    dispatch(setUser(loggedUser));
    cookies.set(CLIENT_USER_INFO, result.responseData);

    return loggedUser;
  } catch (error) {
    cookies.remove(CLIENT_USER_INFO, { path: "/" });
    handleException(error);
    navigate("/login");
  }
};

export const handlePostLogout = (
  axiosService: IAxiosService,
  navigate: NavigateFunction
) => {
  const clientUserInfo = cookies.get(CLIENT_USER_INFO);
  const abortController = new AbortController();
  const axiosTimeout =
    axiosService.setAxiosTimeout(abortController);

  if (!clientUserInfo) return;
  trackPromise(
    axiosService
      .postData({
        headers: {
          [X_SID]: clientUserInfo.sid || "",
        } as unknown as AdvanceAxiosRequestHeaders,
        endpoint: OLYMPUS_SERVICE,
        url: URL_POST_LOGOUT,
        controller: abortController,
      })
      .then(() => navigate("/login"))
      .catch((error) => handleException(error))
      .finally(() => {
        cookies.remove(CLIENT_USER_INFO, { path: "/" });
        clearTimeout(axiosTimeout);
      })
  );
};
