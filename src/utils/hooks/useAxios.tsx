/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createAxios } from "../../config/xhr/axios.tsx";
import { AXIOS_INITIAL_VALUE } from "../../variables/initial/axios.tsx";
import { GET } from "../../variables/global";

// get data without parameter
// get data without parameter
export const useAxios = () => {
  const getData = async (reqConfig: {
    endpoint: string;
    headers?: any;
    url?: string;
    params?: any;
  }) => {
    // creates the cancel token source
    const cancelSource = axios.CancelToken.source();
    // Start timing now
    console.time("Load Time");
    return new Promise((resolve, reject) => {
      // Initial Value
      const result = { ...AXIOS_INITIAL_VALUE };
      createAxios(reqConfig.endpoint)({
        method: GET,
        headers: reqConfig.headers,
        url: reqConfig.url,
        params: reqConfig.params,
        cancelToken: cancelSource.token,
      })
        .then((response: any) => {
          result.responseData = response.data;
          result.responseStatus = response.status;
          console.timeEnd("Load Time");
          resolve(result);
        })
        .catch((error: any) => {
          result.responseError = true;
          if (error.response) {
            if (axios.isCancel(error)) {
              return cancelSource.cancel();
            }
            result.errorContent = error.response.data;
            result.responseStatus = error.response.status;
          } else {
            result.responseStatus = 500;
          }
          console.timeEnd("Load Time");
          reject(result);
        });
    });
  };

  const getAllData = async (
    reqConfigs: { endpoint: string; config?: any }[]
  ) => {
    // Start timing now
    console.time("Load Time");
    return new Promise((resolve, reject) => {
      // Initial Value
      const result = { ...AXIOS_INITIAL_VALUE };

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

  return {
    getData,
    getAllData,
  };
};
