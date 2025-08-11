import { CircularProgress } from '@mui/material';

import { useGetTask } from '../../model/lib/hook/useGetTask';
import { TasksListItemCompleted } from '../TasksListItemCompleted/TasksListItemCompleted';

import cls from './TasksList.module.scss';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { TG_USER } from '@/shared/conts/localStorage';
import { Task, TaskNoAuth } from '../../model/types/tasks';
import { checkTask } from '../../model/servise/checkTask';
import { useState } from 'react';

export const TasksList = () => {
  const { error, isLoading, refetch, tasks } = useGetTask();

  const isAuth = localStorage.getItem(TG_USER);

  const [loadingTask, setLoadingTask] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);

  const handleTask = async (api: string, id: number) => {
    await checkTask({
      setIsLoading: setLoadingTask,
      setError: setTaskError,
      apiTask: api,
      id,
    });
    refetch();
  };

  if (isLoading)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  const tasksToRender: Task[] = !isAuth
    ? ((tasks as Task[]) ?? [])
    : // @ts-ignore
      ((tasks as TaskNoAuth)?.result ?? []);

  return (
    <>
      {taskError && (
        <ErrorAlert message={taskError} sx={{ marginTop: '24px' }} />
      )}
      <div className={cls.TasksList}>
        {tasksToRender?.map((task) => (
          <TasksListItemCompleted
            key={task.id}
            isloading={loadingTask}
            handleTask={handleTask}
            task={task}
          />
        ))}
      </div>
    </>
  );
};
