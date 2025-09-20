import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { Theme } from '../types/theme.types';
import { DefaulResponse } from '@/shared/types/api';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: baseQuery,
  tagTypes: ['Theme'],
  endpoints: (builder) => ({
    getAllTheme: builder.query<DefaulResponse<Theme[]>, void>({
      query: () => ({
        url: `themes/get_all`,
      }),
      providesTags: [{ type: 'Theme' }],
    }),
  }),
});

export const { useGetAllThemeQuery } = themeApi;
