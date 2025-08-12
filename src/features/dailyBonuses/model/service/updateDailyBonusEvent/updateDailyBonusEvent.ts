import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';

type UpdateDailyBonusParams = {
  id: number;
  picture?: File | null;
  date_event: Dayjs;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const updateDailyBonusEvent = async ({
  id,
  picture,
  date_event,
  setIsLoading,
  setError,
}: UpdateDailyBonusParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const userInfoStr = localStorage.getItem(TG_USER);

    const formData = new FormData();
    formData.append('id', String(id));
    if (picture) {
      formData.append('picture', picture);
    }
    formData.append('date_event', date_event.format('YYYY-MM-DD'));
    formData.append('user_info', userInfoStr || '');

    const res = await api.post('/api_field_of_luck/events/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
