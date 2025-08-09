import { Dispatch, SetStateAction } from 'react';
import api from '@/shared/api/axiosConfig';
import { GetResultGameResponse } from '../types/roulette';

type GetResultGameParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setGameData: Dispatch<SetStateAction<GetResultGameResponse | null>>;
  query?: Record<string, string | number | boolean>;
};

export const getResultGame = async ({
  setIsLoading,
  setError,
  setGameData,
  query = {},
}: GetResultGameParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const res = await api.get<GetResultGameResponse>('/users/start_game', {
      params: query,
    });

    setGameData(res.data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    setGameData(null);
  } finally {
    setIsLoading(false);
  }
};
