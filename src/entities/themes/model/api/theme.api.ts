import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { Theme } from '../types/theme.types';
import { ApiError, DefaulResponse } from '@/shared/types/api';
import { userInfo } from '@/shared/conts/userInfo';

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
    startGame: builder.mutation<DefaulResponse, { themeId: number }, ApiError>({
      query: ({ themeId }) => ({
        url: `themes/start_game`,
        method: 'POST',
        body: { user_info: userInfo, themeId },
      }),
    }),
    stopGame: builder.mutation<DefaulResponse, { themeId: number }, ApiError>({
      query: ({ themeId }) => ({
        url: `themes/stop_game`,
        method: 'POST',
        body: { user_info: userInfo, themeId },
      }),
    }),
  }),
});

export const {
  useGetAllThemeQuery,
  useStartGameMutation,
  useStopGameMutation,
} = themeApi;
