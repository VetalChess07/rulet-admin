import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';

interface CreateTasksParams {
  setIsLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
}

export const createTasks = async ({
  setIsLoading,
  setError,
}: CreateTasksParams) => {
  try {
    setIsLoading?.(true);
    setError?.(null);

    const userInfoStr = localStorage.getItem(TG_USER);

    const res = await api.post('/api_field_of_luck/quests/create', {
      user_info: userInfoStr,
    });

    return res.data;
  } catch (err: any) {
    setError?.(err.response?.data?.message || 'Ошибка при создании приза');
    return null;
  } finally {
    setIsLoading?.(false);
  }
};
