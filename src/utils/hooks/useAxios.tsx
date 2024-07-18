import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { createAxios } from "../../config/xhr/axios.tsx";
import { GET, POST } from "../../variables/global";
import {
  IRequestConfig,
  IResponseObject,
} from "../../interfaces/axios/index.tsx";

const initial: IResponseObject = {
  responseData: undefined,
  responseStatus: undefined,
  responseError: false,
  errorContent:
    "Ada yang salah nih, coba lagi nanti atau contact support kita yah.",
};

export const useAxios = () => {
  const setAxiosTimeout = (controller: AbortController) => {
    const timeout = setTimeout(
      () => controller.abort(),
      30000
    );
    return timeout;
  };

  const getData = async (reqConfig: IRequestConfig) => {
    console.time("Load Time");
    return new Promise<IResponseObject>(
      (resolve, reject) => {
        // Initial Value
        const result = { ...initial };
        createAxios(reqConfig.endpoint)({
          method: GET,
          headers: reqConfig.headers,
          url: reqConfig.url,
          params: reqConfig.params,
          signal: reqConfig.controller.signal,
        })
          .then((response: AxiosResponse) => {
            result.responseData = response.data;
            result.responseStatus = response.status;
            console.timeEnd("Load Time");
            resolve(result);
          })
          .catch((error) => {
            result.responseError = true;
            if (error.response) {
              result.errorContent = error.response.data;
              result.responseStatus = error.response.status;
            } else result.responseStatus = 500;

            console.timeEnd("Load Time");
            reject(result);
          });
      }
    );
  };

  const getDataWithOnRequestInterceptors = async (
    reqConfig: IRequestConfig,
    callbackInterceptors?: () => Promise<IResponseObject>
  ): Promise<IResponseObject> => {
    console.time("Load Time");

    return new Promise<IResponseObject>(
      (resolve, reject) => {
        // Initial Value
        const result: IResponseObject = {
          ...initial,
        };
        const axiosInstance = createAxios(
          reqConfig.endpoint
        );

        if (callbackInterceptors) {
          axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
              const res = await callbackInterceptors();
              if (res.responseStatus === 200) return config;
              else {
                result.responseError = true;
                result.errorContent = res.errorContent;
                result.responseStatus = res.responseStatus;
                console.timeEnd("Load Time");
                reject(result);
                return config;
              }
            },
            (error) => {
              result.responseError = true;
              result.errorContent = error.toString();
              result.responseStatus = 500;
              console.timeEnd("Load Time");
              reject(result);
            }
          );
        }

        axiosInstance({
          method: GET,
          headers: reqConfig.headers,
          url: reqConfig.url,
          params: reqConfig.params,
          signal: reqConfig.controller.signal,
        })
          .then((response: AxiosResponse) => {
            result.responseData = response.data;
            result.responseStatus = response.status;
            console.timeEnd("Load Time");
            resolve(result);
          })
          .catch((error) => {
            result.responseError = true;
            if (error.response) {
              result.errorContent = error.response.data;
              result.responseStatus = error.response.status;
            } else result.responseStatus = 500;

            console.timeEnd("Load Time");
            reject(result);
          });
      }
    );
  };

  const getAllData = async (
    reqConfigs: IRequestConfig[]
  ) => {
    // Start timing now
    console.time("Load Time");
    return new Promise<IResponseObject>((_, reject) => {
      // Initial Value
      const result = { ...initial };

      const axiosInstance = axios;
      axiosInstance
        .all(
          reqConfigs.map((reqConfig) => getData(reqConfig))
        )
        .then(
          axiosInstance.spread((...datas) => ({
            ...result,
            responseStatus: 200,
            responseData: datas,
          }))
        )
        .catch((error) => reject(error))
        .finally(() => {
          console.timeEnd("Load Time");
        });
    });
  };

  const postData = async (
    reqConfig: IRequestConfig
  ): Promise<IResponseObject> => {
    console.time("Load Time");

    return new Promise<IResponseObject>(
      (resolve, reject) => {
        const result = { ...initial };
        createAxios(reqConfig.endpoint)({
          method: POST,
          headers: reqConfig.headers,
          url: reqConfig.url,
          data: reqConfig.data,
          signal: reqConfig.controller.signal,
        })
          .then((response: AxiosResponse) => {
            result.responseData = response.data;
            result.responseStatus = response.status;
            console.timeEnd("Load Time");
            resolve(result);
          })
          .catch((error) => {
            result.responseError = true;
            if (error.response) {
              result.errorContent = error.response.data;
              result.responseStatus = error.response.status;
            } else result.responseStatus = 500;

            console.timeEnd("Load Time");
            reject(result);
          });
      }
    );
  };

  return {
    setAxiosTimeout,
    getData,
    getDataWithOnRequestInterceptors,
    getAllData,
    postData,
  };
};
