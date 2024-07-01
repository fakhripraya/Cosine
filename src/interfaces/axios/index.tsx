/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

export interface IRequestConfig {
  endpoint: string;
  headers?: AxiosRequestHeaders;
  url?: string;
  params?: AxiosRequestConfig["params"];
}

export interface IResponseConfig {
  responseData?: any;
  responseStatus?: number;
  responseError: boolean;
  errorContent: string;
}
