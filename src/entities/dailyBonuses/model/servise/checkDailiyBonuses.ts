import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

type CheckDailiyBonusesParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;

  id: number;
};

export const checkDailiyBonuses = async ({
  setIsLoading,
  setError,

  id,
}: CheckDailiyBonusesParams) => {
  try {
    setIsLoading(true);
    setError(null);
    const userInfoStr = localStorage.getItem(TG_USER);
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

    const res = await api.post('api_field_of_luck/events_users/check', {
      user_info: userInfoStr,
      eventId: id,
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
