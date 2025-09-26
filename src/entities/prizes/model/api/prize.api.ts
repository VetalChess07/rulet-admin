import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import type { Prize } from '../types/prizes';
import { ApiError, DefaulResponse } from '@/shared/types/api';
import { userInfo } from '@/shared/conts/userInfo';

export const prizeApi = createApi({
  reducerPath: 'prizeApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  tagTypes: ['Prize'],
  endpoints: (builder) => ({
    getAllPrizes: builder.query<DefaulResponse<Prize[]>, void, ApiError>({
      query: () => ({
        url: `prizes/get_all`,
      }),
      providesTags: [{ type: 'Prize' }],
    }),
    getAllPrizesByThemeId: builder.query<
      DefaulResponse<Prize[]>,
      { themeId: number },
      ApiError
    >({
      query: ({ themeId }) => ({
        url: `prizes/get_all-by-theme?themeId=${themeId}`,
      }),
      providesTags: [{ type: 'Prize' }],
    }),

    deletePrize: builder.mutation<
      DefaulResponse<Prize[]>,
      { prizeId: number },
      ApiError
    >({
      query: ({ prizeId }) => ({
        url: `prizes/delete`,
        method: 'POST',
        body: { user_info: userInfo, prizeId },
      }),
    }),

    createPrize: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'prizes/create',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Prize'],
    }),

    createPrizeValues: builder.mutation<
      void,
      { prizeId: number; values: string }
    >({
      query: (body) => ({
        url: 'prizes-value/create',
        method: 'POST',
        body: { ...body, user_info: userInfo },
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Prize'],
    }),

    updatePrize: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'prizes/update',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Prize'],
    }),
  }),
});

export type DeletePrizeMutationFn = ReturnType<
  typeof useDeletePrizeMutation
>[0];

export type CreatePrizeMutationFn = ReturnType<
  typeof useCreatePrizeMutation
>[0];

export const {
  useCreatePrizeMutation,
  useDeletePrizeMutation,
  useGetAllPrizesByThemeIdQuery,
  useGetAllPrizesQuery,
  useUpdatePrizeMutation,
  useCreatePrizeValuesMutation,
} = prizeApi;
