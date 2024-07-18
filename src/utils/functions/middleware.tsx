import { cookies } from "../../config/cookie";
import { OLYMPUS_SERVICE } from "../../config/environment";
import { URL_CHECK_AUTH_AND_REFRESH_TOKEN } from "../../config/xhr/routes/credentials";
import {
  AdvanceAxiosRequestHeaders,
  IAxiosService,
  IResponseObject,
} from "../../interfaces/axios";
import {
  ICheckAuthResult,
  ICookieInfo,
} from "../../interfaces/credential";
import { USER_UNAUTHORIZED } from "../../variables/errorMessages/credential";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  X_SID,
} from "../../variables/global";
import { IS_OTP_VERIFIED } from "../validations/credential";

export async function checkAuthAndRefresh(
  axiosService: IAxiosService,
  abortController: AbortController
): Promise<ICheckAuthResult> {
  const login: ICookieInfo = cookies.get(CLIENT_USER_INFO);

  if (!IS_OTP_VERIFIED(login))
    return {
      message: USER_UNAUTHORIZED,
      responseStatus: 401,
    };

  const result: ICheckAuthResult = await axiosService
    .postData({
      headers: {
        [X_SID]: `${login.sid}`,
        [AUTHORIZATION]: `Bearer ${login.credentialToken.accessToken}`,
      } as unknown as AdvanceAxiosRequestHeaders,
      endpoint: OLYMPUS_SERVICE,
      url: URL_CHECK_AUTH_AND_REFRESH_TOKEN,
      data: {
        credentialToken: login.credentialToken,
      },
      controller: abortController,
    })
    .then((res: IResponseObject) => {
      cookies.set(CLIENT_USER_INFO, res.responseData);
      return { message: "Success", responseStatus: 200 };
    })
    .catch((error: IResponseObject) => ({
      message: error.errorContent ?? "An error occurred",
      responseStatus: error.responseStatus,
    }));

  return result;
}
