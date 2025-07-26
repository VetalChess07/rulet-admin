import { RootState } from '@/app/providers/storeProvider/config/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token') || '';
};

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ffmo.ru/api/v2/',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    let token = state;

    // 2. Если в Redux нет токена, пробуем достать из localStorage
    if (!token) {
      token = getTokenFromLocalStorage();
    }

    // 3. Добавляем в заголовки Authorization
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
