/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

export interface IAxiosService {
  setAxiosTimeout: (
    controller: AbortController,
    milisecond?: number
  ) => NodeJS.Timeout;
  getData: (
    reqConfig: IRequestConfig
  ) => Promise<IResponseObject>;
  getDataWithOnRequestInterceptors: (
    reqConfig: IRequestConfig,
    callbackInterceptors?: () => Promise<IResponseObject>
  ) => Promise<IResponseObject>;
  getAllData: (
    reqConfigs: IRequestConfig[]
  ) => Promise<IResponseAllObject>;
  postData: (
    reqConfig: IRequestConfig
  ) => Promise<IResponseObject>;
}

export interface AdvanceAxiosRequestHeaders
  extends AxiosRequestHeaders {
  [key: string]: any;
}

export interface IRequestConfig {
  endpoint?: string;
  headers?: AdvanceAxiosRequestHeaders;
  url?: string;
  params?: AxiosRequestConfig["params"];
  data?: AxiosRequestConfig["data"];
  controller: AbortController;
}

export interface IResponseAllObject {
  responseData?: IResponseObject[];
  responseStatus?: number;
  responseError: boolean;
  errorContent: string;
}

export interface IResponseObject {
  responseData?: any;
  responseStatus?: number;
  responseError: boolean;
  errorContent: string;
}

export function isIResponseObject(
  obj: any
): obj is IResponseObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "responseError" in obj &&
    typeof obj.responseError === "boolean" &&
    "errorContent" in obj &&
    typeof obj.errorContent === "string"
  );
}
