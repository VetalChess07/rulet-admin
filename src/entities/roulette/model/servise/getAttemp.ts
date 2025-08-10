import { Dispatch, SetStateAction } from 'react';
import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import {
  GetResultAttempResponse,
  GetResultGameResponse,
} from '../types/roulette';
import { TG_USER } from '@/shared/conts/localStorage';
import { AxiosError } from 'axios';

type GetAttempParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setAttemp: Dispatch<SetStateAction<number>>;
};

export const getAttemp = async ({
  setIsLoading,
  setError,
  setAttemp,
}: GetAttempParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const res = await api.get<GetResultAttempResponse>('/users/get_attempt', {
      params: {
        user_info: localStorage.getItem(TG_USER),
      },
    });

    setAttemp(res.data.attempt);
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
