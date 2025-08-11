import { Dispatch, SetStateAction } from 'react';
import { Task, TaskNoAuth } from '../types/tasks';
import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';

type GetTaskParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setTasks: Dispatch<SetStateAction<Task[] | TaskNoAuth[] | null>>;
};

///quests_users/get_all

export const getTask = async ({
  setIsLoading,
  setError,
  setTasks,
}: GetTaskParams) => {
  try {
    const userInfo = localStorage.getItem(TG_USER);
    const path = userInfo ? '/quests_users/get_all' : '/quests/get_all';

    const res = await api.get<Task[]>(`api_field_of_luck${path}`, {
      params: {
        user_info: userInfo,
      },
    });
    setIsLoading(true);
    setError(null);
    setTasks(res.data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    setTasks(null);
  } finally {
    setIsLoading(false);
  }
};
