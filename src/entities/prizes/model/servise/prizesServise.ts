import { Dispatch, SetStateAction } from 'react';
import { Prize } from '../types/prizes';
import api from '@/shared/api/axiosConfig';

type GetAllPrizesParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setPrizes: Dispatch<SetStateAction<Prize[] | null>>;
};

export const getAllPrizes = async ({
  setIsLoading,
  setError,
  setPrizes,
}: GetAllPrizesParams) => {
  try {
    const res = await api.get<Prize[]>('api_field_of_luck/prizes/get_all');
    setIsLoading(true);
    setError(null);
    setPrizes(res.data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    setPrizes(null);
  } finally {
    setIsLoading(false);
  }
};
