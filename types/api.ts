export type QueryMethod = "post" | "put" | "patch" | "delete"

export interface ApiResponseSuccess<T> {
  status: string;
  data: T;
  token?: string;
  message: string;
}

export interface ApiResponseError {
  status: string;
  message: string;
  error: any;
  stack: any;
}