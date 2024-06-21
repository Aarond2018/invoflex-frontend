import {
  QueryKey,
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiInstance } from "./axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponseError, ApiResponseSuccess, QueryMethod } from "@/types/api";

export const useReactQuery = <T>(key: QueryKey, path: string) => {
  return useQuery<
    AxiosResponse<ApiResponseSuccess<T>>,
    AxiosError<ApiResponseError>
  >({
    queryKey: [key],
    queryFn: () => apiInstance.get<ApiResponseSuccess<T>>(path),
  });
};

// export const useReactMutation = <T>(path: string, method: QueryMethod) => {
//   return useMutation<AxiosResponse<ApiResponseSuccess<T>>, AxiosError>({
//     mutationFn: (data) => {
//       return apiInstance[`${method}`]<ApiResponseSuccess<T>>(path, data);
//     },
//   });
// };

export const useReactMutation = <T, U>(
  path: string,
  method: QueryMethod
): UseMutationResult<AxiosResponse<ApiResponseSuccess<T>>, AxiosError, U> => {
  return useMutation<AxiosResponse<ApiResponseSuccess<T>>, AxiosError, U>({
    mutationFn: (data: U) => {
      return apiInstance[method]<ApiResponseSuccess<T>>(path, data);
    },
  });
};
