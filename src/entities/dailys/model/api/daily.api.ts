import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import type { Daily } from '../types/dailys';
import { ApiError, DefaulResponse } from '@/shared/types/api';
import { userInfo } from '@/shared/conts/userInfo';

export const dailyApi = createApi({
  reducerPath: 'dailyApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  tagTypes: ['Daily'],
  endpoints: (builder) => ({
    getAllDailys: builder.query<DefaulResponse<Daily[]>, void, ApiError>({
      query: () => ({
        url: `dailys/get_all`,
      }),
      providesTags: [{ type: 'Daily' }],
    }),
    getAllDailysByThemeId: builder.query<
      DefaulResponse<Daily[]>,
      { themeId: number },
      ApiError
    >({
      query: ({ themeId }) => ({
        url: `dailys/get_all-by-theme?themeId=${themeId}`,
      }),
      providesTags: [{ type: 'Daily' }],
    }),

    deleteDaily: builder.mutation<
      DefaulResponse<Daily[]>,
      { dailyId: number },
      ApiError
    >({
      query: ({ dailyId }) => ({
        url: `dailys/delete`,
        method: 'POST',
        body: { user_info: userInfo, dailyId },
      }),
    }),

    createDaily: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'dailys/create',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Daily'],
    }),

    updateDaily: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'dailys/update',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Daily'],
    }),
  }),
});

export type DeleteDailyMutationFn = ReturnType<
  typeof useDeleteDailyMutation
>[0];

export type CreateDailyMutationFn = ReturnType<
  typeof useCreateDailyMutation
>[0];

export const {
  useCreateDailyMutation,
  useDeleteDailyMutation,
  useGetAllDailysByThemeIdQuery,
  useGetAllDailysQuery,
  useUpdateDailyMutation,
} = dailyApi;
