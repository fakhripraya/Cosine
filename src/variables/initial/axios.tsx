/* eslint-disable @typescript-eslint/no-explicit-any */
interface AxiosInitialValue {
  responseData: any | null;
  responseStatus: string | number | null;
  responseError: boolean;
  errorContent: string;
}

export const AXIOS_INITIAL_VALUE: AxiosInitialValue = {
  responseData: null,
  responseStatus: null,
  responseError: false,
  errorContent:
    "Something went wrong,\nPlease try again or contact our support.",
};
