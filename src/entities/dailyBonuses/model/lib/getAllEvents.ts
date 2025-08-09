import { Dispatch, SetStateAction } from 'react';
import type { DailyBonuses } from '../types/dailyBonuses';
import api from '@/shared/api/axiosConfig';

type GetAllPrizesParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setAllEvents: Dispatch<SetStateAction<DailyBonuses[] | null>>;
};

export const getAllEvents = async ({
  setIsLoading,
  setError,
  setAllEvents,
}: GetAllPrizesParams) => {
  try {
    const res = await api.get<DailyBonuses[]>('/events/get_all');
    setIsLoading(true);
    setError(null);
    setAllEvents(res.data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    setAllEvents(null);
  } finally {
    setIsLoading(false);
  }
};
