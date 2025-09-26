import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import type { Task } from '../types/tasks';
import { ApiError, DefaulResponse } from '@/shared/types/api';
import { userInfo } from '@/shared/conts/userInfo';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getAllTasks: builder.query<DefaulResponse<Task[]>, void, ApiError>({
      query: () => ({
        url: `quests/get_all`,
      }),
      providesTags: [{ type: 'Task' }],
    }),
    getAllTasksByThemeId: builder.query<
      DefaulResponse<Task[]>,
      { themeId: number },
      ApiError
    >({
      query: ({ themeId }) => ({
        url: `quests/get_all-by-themeId?themeId=${themeId}`,
      }),
      providesTags: [{ type: 'Task' }],
    }),

    deleteTask: builder.mutation<
      DefaulResponse<Task[]>,
      { questId: number },
      ApiError
    >({
      query: ({ questId }) => ({
        url: `quests/delete`,
        method: 'POST',
        body: { user_info: userInfo, questId },
      }),
    }),

    createTask: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'quests/create',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'quests/update',
        method: 'POST',
        body: formData,
        extra: { isFormData: true },
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksByThemeIdQuery,
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} = taskApi;
