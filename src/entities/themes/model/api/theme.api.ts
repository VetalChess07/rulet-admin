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
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
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
    deleteTheme: builder.mutation<
      DefaulResponse<Theme[]>,
      { themeId: number },
      ApiError
    >({
      query: ({ themeId }) => ({
        url: `themes/delete`,
        method: 'POST',
        body: { user_info: userInfo, themeId },
      }),
    }),

    createTheme: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'themes/create',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Theme'],
    }),
    updateTheme: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'themes/update',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Theme'],
    }),
  }),
});

export type DeleteThemeMutationFn = ReturnType<
  typeof useDeleteThemeMutation
>[0];

export type CreateThemeMutationFn = ReturnType<
  typeof useCreateThemeMutation
>[0];

export const {
  useGetAllThemeQuery,
  useStartGameMutation,
  useStopGameMutation,
  useDeleteThemeMutation,
  useCreateThemeMutation,
  useUpdateThemeMutation,
} = themeApi;
