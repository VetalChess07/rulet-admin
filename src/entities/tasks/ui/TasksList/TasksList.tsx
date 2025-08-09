import { CircularProgress } from '@mui/material';

import { useGetTask } from '../../model/lib/hook/useGetTask';
import { TasksListItemCompleted } from '../TasksListItemCompleted/TasksListItemCompleted';

import cls from './TasksList.module.scss';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

export const TasksList = () => {
  const { error, isLoading, refetch, tasks } = useGetTask();

  if (isLoading)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <div className={cls.TasksList}>
      {tasks?.map((task) => (
        <TasksListItemCompleted refetch={refetch} task={task} />
      ))}
    </div>
  );
};
