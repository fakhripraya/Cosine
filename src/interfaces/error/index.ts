import { IResponseObject } from "../axios";

export interface IErrorMessage {
  isError: boolean;
  errorContent: string;
}

export interface IResponseError extends Error {
  response: IResponseObject;
}
