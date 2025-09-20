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

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'https://your-backend.com/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getTokenFromLocalStorage();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Конфиг для дефолтных query-параметров
const defaultQueryParams: Record<string, string> = {};
if (userInfo) {
  defaultQueryParams['user_info'] = JSON.stringify(userInfo);
}

export const baseQuery = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  if (typeof args === 'string') {
    args = addQueryParams(args, defaultQueryParams);
  } else if (args.url) {
    args.url = addQueryParams(args.url, defaultQueryParams);
  }

  return rawBaseQuery(args, api, extraOptions);
};
