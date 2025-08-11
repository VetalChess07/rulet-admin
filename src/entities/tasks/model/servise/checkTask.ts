import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';
import { parseLocalStorageObject } from '@/shared/lib/parseLocalStorageObject';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

const VITE_DOMEN = import.meta.env.VITE_DOMEN;

type CheckTaskParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  apiTask: string;
  id: number;
};

export const checkTask = async ({
  setIsLoading,
  setError,
  apiTask,
  id,
}: CheckTaskParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const res = await api.get(`${VITE_DOMEN}${apiTask}`, {
      params: {
        user_info: localStorage.getItem(TG_USER),
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const axiosError = err as AxiosError<ApiError>;
      const message = err.response?.data.message as AxiosError<ApiErrorAuth>;
      const apiError = axiosError?.response?.data.text ?? 'Неизвестная ошибка';

      setError(`${message ?? apiError}`);
    }
    return null;
  } finally {
    setIsLoading(false);
  }
};
