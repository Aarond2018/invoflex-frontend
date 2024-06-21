export type QueryMethod = "post" | "put" | "patch" | "delete"

export interface ApiResponseSuccess<T> {
  status: string;
  data: T;
  token?:string;
}

export interface ApiResponseError {
  status: string;
  message: string;
  error: unknown;
  stack: any;
}