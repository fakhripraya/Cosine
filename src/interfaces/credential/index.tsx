export interface ICookieInfo {
  sid: string;
  credentialToken: ICredentialToken;
  user: IUserData;
}

export interface ICredentialToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUserData {
  userId: string;
  username: string;
  fullName: string;
  phoneNumber: string | undefined;
  email: string;
  isOTPVerfied: boolean;
}

export interface ICheckAuthResult {
  message: string;
  responseStatus: number | undefined;
}

export interface ILoginData {
  [key: string]: string;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IForgotPWData {
  email: string;
}

export interface INewPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export interface IOTPData {
  OTPInput: string;
  credentialToken?: string;
  sid?: string;
}
