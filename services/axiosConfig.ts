import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//interceptor to check for and append token
apiInstance.interceptors.request.use(
  function (config) {
    const token = getCookie("dToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("tokenCheck-----")

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
