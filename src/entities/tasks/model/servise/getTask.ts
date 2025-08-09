import { Dispatch, SetStateAction } from 'react';
import { Task } from '../types/tasks';
import api from '@/shared/api/axiosConfig';

type GetTaskParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setTasks: Dispatch<SetStateAction<Task[] | null>>;
};

export const getTask = async ({
  setIsLoading,
  setError,
  setTasks,
}: GetTaskParams) => {
  try {
    const res = await api.get<Task[]>('/quests/get_all');
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
