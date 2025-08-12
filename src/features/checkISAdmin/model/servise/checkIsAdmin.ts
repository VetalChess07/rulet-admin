import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

type checkIsAdminParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const checkIsAdmin = async ({
  setIsLoading,
  setError,
}: checkIsAdminParams) => {
  try {
    setIsLoading(true);
    setError(null);
    const userInfoStr = localStorage.getItem(TG_USER);
    const res = await api.post('api_field_of_luck/users/check_admin', {
      user_info: userInfoStr,
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
