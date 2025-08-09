import { Dispatch, SetStateAction } from 'react';
import api from '@/shared/api/axiosConfig';
import { GetResultGameResponse } from '../types/roulette';
import { TG_USER } from '@/shared/conts/localStorage';

type GetResultGameParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const getResultGame = async ({
  setIsLoading,
  setError,
}: GetResultGameParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const res = await api.get<GetResultGameResponse>('/users/start_game', {
      params: {
        user_info: localStorage.getItem(TG_USER),
      },
    });

    return res.data;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    return null;
  } finally {
    setIsLoading(false);
  }
};
