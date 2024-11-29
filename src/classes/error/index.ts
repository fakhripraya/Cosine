import { IResponseObject } from "../../interfaces/axios";
import { IResponseError } from "../../interfaces/error";
import { UNKNOWN_ERROR } from "../../variables/errorMessages/home";

export class ResponseError
  extends Error
  implements IResponseError
{
  response: IResponseObject;

  constructor(response: IResponseObject) {
    super(response.errorContent || UNKNOWN_ERROR);
    this.name = "ResponseError";
    this.response = response;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
