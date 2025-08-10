import { Dispatch, SetStateAction } from 'react';
import type { DailyBonuses } from '../types/dailyBonuses';
import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';

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
    // const res = await api.get<DailyBonuses[]>('/events/get_all');

    const userInfo = localStorage.getItem(TG_USER);
    const path = userInfo ? '/events_users/get_all' : '/events/get_all';

    const res = await api.get<DailyBonuses[]>(path, {
      params: {
        user_info: userInfo,
      },
    });
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
