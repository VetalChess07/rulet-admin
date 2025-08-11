import React, { Dispatch, SetStateAction } from 'react';

import { Task, TaskStatus } from '../../model/types/tasks';
import { Button, Typography } from '@mui/material';

import ImgMoney from '@/shared/assets/images/money.png';
import IconTicketActive from '@/shared/assets/icons/ticketActive.svg?react';

import cls from './TasksListItemCompleted.module.scss';

interface TasksListItemCompletedProps {
  task: Task;
  handleTask: (api: string, id: number) => void;
  isloading: boolean;
}

export const TasksListItemCompleted = (props: TasksListItemCompletedProps) => {
  const { task, handleTask, isloading } = props;

  const titleWords = task.name.split(' ');
  const titleHalf = Math.ceil(titleWords.length / 2);
  const title = titleWords.slice(0, titleHalf).join(' ');
  const titleActive = titleWords.slice(titleHalf).join(' ');

  return (
    <div className={cls.TasksListItemCompleted}>
      <div className={cls.header}>
        <Typography className={cls.title} variant="subtitle2">
          <span>{title}</span>
          <span className={cls.accent}> {titleActive}</span>
        </Typography>

        <Typography variant="body1">{task.description}</Typography>
      </div>
      <IconTicketActive className={cls.IconTicketActive} />

      <div className={cls.item}>
        <Button
          disabled={isloading}
          onClick={() => handleTask(task.api, task.id)}
          className={cls.btn}
        >
          Сделано
        </Button>
        <img className={cls.money} src={ImgMoney} alt="приз" />
      </div>
    </div>
  );
};
