import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';

interface UploadPrizesParams {
  array: string[]; // список подарков (выигрышей)
  prizeId: number; // id приза
  setIsLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
}

export const uploadPrizesValues = async ({
  array,
  prizeId,
  setIsLoading,
  setError,
}: UploadPrizesParams) => {
  try {
    setIsLoading?.(true);
    setError?.(null);

    const userInfoStr = localStorage.getItem(TG_USER);

    if (!userInfoStr) {
      setError?.('Нет информации о пользователе');
      return null;
    }

    const payload = {
      array,
      prizeId,
      user_info: userInfoStr,
    };

    const res = await api.post(
      '/api_field_of_luck/prizes_values/create',
      payload,
    );

    if (res.status === 200) {
      return res.data;
    } else {
      setError?.('Ошибка при загрузке списка призов');
      return null;
    }
  } catch (err: any) {
    setError?.(
      err.response?.data?.message || 'Ошибка при загрузке списка призов',
    );
    return null;
  } finally {
    setIsLoading?.(false);
  }
};
