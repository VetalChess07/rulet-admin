import { Button, Typography } from '@mui/material';
import { Task } from '../../model/types/tasks';

import IconApprove from '@/shared/assets/icons/approve.svg?react';

import cls from './TasksListItemNotCompleted.module.scss';

interface TasksListItemNotCompletedProps {
  task: Task;
}

export const TasksListItemNotCompleted = (
  props: TasksListItemNotCompletedProps,
) => {
  const { task } = props;

  return (
    <div className={cls.TasksListItemNotCompleted}>
      <div className={cls.header}>
        <Typography variant="subtitle2">{task.description}</Typography>
        <Typography className={cls.description} variant="body1">
          {task.description}
        </Typography>
      </div>

      <div className={cls.item}>
        <Button className={cls.btn} disabled>
          Сделано
        </Button>
        <IconApprove className={cls.icon} />
      </div>
    </div>
  );
};
