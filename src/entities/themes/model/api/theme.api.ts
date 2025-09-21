import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { Theme } from '../types/theme.types';
import { ApiError, DefaulResponse } from '@/shared/types/api';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: baseQuery as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ApiError,
    {}
  >,
  tagTypes: ['Theme'],
  endpoints: (builder) => ({
    getAllTheme: builder.query<DefaulResponse<Theme[]>, void, ApiError>({
      query: () => ({
        url: `themes/get_all`,
      }),
      providesTags: [{ type: 'Theme' }],
    }),
  }),
});

export const { useGetAllThemeQuery } = themeApi;
