import { TasksList } from '../TasksList/TasksList';
import { Typography } from '@mui/material';

import cls from './Tasks.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export const Tasks = () => {
  return (
    <div className={classNames(cls.Tasks, {}, ['container'])}>
      <Typography variant="body2">
        Выполняй задания, чтобы увеличить количество попыток
      </Typography>
      <TasksList />
    </div>
  );
};
