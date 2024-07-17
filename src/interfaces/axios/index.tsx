/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

export interface IRequestConfig {
  endpoint?: string;
  headers?: AxiosRequestHeaders;
  url?: string;
  params?: AxiosRequestConfig["params"];
  data?: AxiosRequestConfig["data"];
  controller: AbortController;
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
    typeof obj.errorContent === "string" &&
    ("responseData" in obj ||
      "responseData" in obj === undefined) &&
    ("responseStatus" in obj ||
      "responseStatus" in obj === undefined)
  );
}
