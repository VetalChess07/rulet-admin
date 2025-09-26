import { fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';
import { TG_USER } from '../conts/localStorage';
import { User } from '@/entities/user';

export const getTokenFromLocalStorage = () =>
  localStorage.getItem('token') || '';

const userInfoString = localStorage.getItem(TG_USER);
const userInfo: User | null = userInfoString
  ? JSON.parse(userInfoString)
  : null;

const addQueryParams = (url: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return url.includes('?')
    ? `${url}&${searchParams.toString()}`
    : `${url}?${searchParams.toString()}`;
};

// Конфиг для дефолтных query-параметров
const defaultQueryParams: Record<string, string> = {};
if (userInfo) {
  defaultQueryParams['user_info'] = JSON.stringify(userInfo);
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'https://your-backend.com/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getTokenFromLocalStorage();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQuery = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  if (typeof args === 'string') {
    args = addQueryParams(args, defaultQueryParams);
  } else if (args.url) {
    args.url = addQueryParams(args.url, defaultQueryParams);

    // ❗️ Если body не FormData, ставим Content-Type JSON
    if (args.body && !(args.body instanceof FormData)) {
      args.headers = {
        ...(args.headers || {}),
        'Content-Type': 'application/json',
      };
    }
  }

  return rawBaseQuery(args, api, extraOptions);
};
