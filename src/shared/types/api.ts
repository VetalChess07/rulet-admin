import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface DefaultSuccessResponse<T = unknown> {
  data: T;
  status: number;
}

export interface DefaultErrorResponse {
  error: string;
  status: number;
}

export type DefaulResponse<T = unknown> = DefaultSuccessResponse<T> &
  DefaultErrorResponse;

export type ApiError = FetchBaseQueryError & { data: DefaultErrorResponse };
