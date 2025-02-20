import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

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

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//interceptor to redirect to login if a user is unauthorized
apiInstance.interceptors.response.use(function (response: AxiosResponse) {
  return response;
}, function (error: AxiosError) {

  if(error.response && error.response.status === 401) {
    deleteCookie("dToken")

    window.location.replace("/auth/login")
  }

  return Promise.reject(error);
});
