import { TasksList } from '../TasksList/TasksList';
import { Typography } from '@mui/material';

import cls from './Tasks.module.scss';

export const Tasks = () => {
  return (
    <div className={cls.Tasks}>
      <Typography variant="body2">
        Выполняй задания, чтобы увеличить количество попыток
      </Typography>
      <TasksList />
    </div>
  );
};
