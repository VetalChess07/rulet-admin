// src/features/prizes/model/api/updatePrizeEvent.ts
import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

type UpdatePrizeParams = {
  id: number;
  name: string;
  description: string;
  type: string; // "1" или ""
  procent: number; // дробное до десятых
  picture?: File | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const updatePrizeEvent = async ({
  id,
  name,
  description,
  type,
  procent,
  picture,
  setIsLoading,
  setError,
}: UpdatePrizeParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const userInfoStr = localStorage.getItem(TG_USER);

    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', type); // "1" или ""
    formData.append('procent', String(procent));
    if (picture) {
      formData.append('picture', picture);
    }
    formData.append('user_info', userInfoStr || '');

    const res = await api.post('/api_field_of_luck/prizes/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const axiosError = err as AxiosError<ApiError>;
      const message = err.response?.data.message as AxiosError<ApiErrorAuth>;
      const apiError = axiosError?.response?.data.text ?? 'Unknown error';

      setError(`${message ?? apiError}`);
    }
    return null;
  } finally {
    setIsLoading(false);
  }
};
