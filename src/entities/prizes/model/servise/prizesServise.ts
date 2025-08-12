import { Dispatch, SetStateAction } from 'react';
import { Prize } from '../types/prizes';
import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';

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
    const userInfo = localStorage.getItem(TG_USER);

    const res = await api.get<Prize[]>(
      'api_field_of_luck/prizes/get_all_admin',
      {
        params: {
          user_info: userInfo,
        },
      },
    );
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
