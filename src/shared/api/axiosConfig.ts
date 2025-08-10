import axios from 'axios';

export interface ApiError {
  status: number;
  code: string;
  text: string;
}

export interface ApiErrorAuth {
  message: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-backend.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
