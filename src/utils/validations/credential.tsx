import { IResponseObject } from "../../interfaces/axios";
import { ICookieInfo } from "../../interfaces/credential";

export const IS_INPUT_OTP_ELIGIBLE = (
  cookie: ICookieInfo | undefined
) => cookie?.credentialToken && cookie?.sid;

export const IS_OTP_VERIFIED = (
  cookie: ICookieInfo | undefined
) => cookie?.user?.isOTPVerfied;

export const IS_NOT_AUTHENTICATE = (
  result: IResponseObject
) =>
  result.responseStatus === 401 ||
  result.responseStatus === 403;
