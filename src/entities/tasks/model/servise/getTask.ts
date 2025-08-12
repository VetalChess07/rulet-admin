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
    const res = await api.get<Task[]>(`api_field_of_luck/quests/get_all`, {});
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
