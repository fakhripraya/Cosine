import axios from "axios";

export const createAxios = (baseUrl: string) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: 61000,
    withCredentials: true,
  });
};
