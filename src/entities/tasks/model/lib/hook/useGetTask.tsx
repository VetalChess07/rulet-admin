import { useEffect, useState } from 'react';
import { getTask } from '../../servise/getTask';
import { Task } from '../../types/tasks';

export const useGetTask = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    getTask({
      setError,
      setIsLoading,
      setTasks,
    });
  };

  useEffect(() => {
    getTask({
      setError,
      setIsLoading,
      setTasks,
    });
  }, []);

  return {
    refetch,
    tasks,
    isLoading,
    error,
  };
};
