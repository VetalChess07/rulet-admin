import React, { Dispatch, SetStateAction } from 'react';

import { Task, TaskStatus } from '../../model/types/tasks';
import { Button, Typography } from '@mui/material';

import ImgMoney from '@/shared/assets/images/money.png';
import IconTicketActive from '@/shared/assets/icons/ticketActive.svg?react';

import cls from './TasksListItemCompleted.module.scss';

interface TasksListItemCompletedProps {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const TasksListItemCompleted = (props: TasksListItemCompletedProps) => {
  const { task, setTasks } = props;

  const titleWords = task.title.split(' ');
  const titleHalf = Math.ceil(titleWords.length / 2);
  const title = titleWords.slice(0, titleHalf).join(' ');
  const titleActive = titleWords.slice(titleHalf).join(' ');

  const taskWords = task.task.split(' ');
  const taskHalf = Math.ceil(titleWords.length / 2);
  const taskText = taskWords.slice(0, taskHalf).join(' ');
  const taskTextActive = taskWords.slice(taskHalf).join(' ');

  const handleClick = () => {
    setTasks((prev) =>
      prev
        ? prev.map((item, i) =>
            item.id === task.id
              ? { ...item, status: TaskStatus.NOTCOMPLETED }
              : item,
          )
        : prev,
    );
  };

  return (
    <div className={cls.TasksListItemCompleted} onClick={handleClick}>
      <div className={cls.header}>
        <Typography className={cls.title} variant="subtitle2">
          <span>{title}</span>
          <span className={cls.accent}> {titleActive}</span>
        </Typography>

        <Typography className={cls.task} variant="body1">
          <span>{taskText}</span>
          <span className={cls.accent}> {taskTextActive}</span>
          {/* <Typography className={cls.task} variant="body1">
            {task.task}
          </Typography> */}
        </Typography>
        <Typography variant="body1">{task.description}</Typography>
      </div>
      <IconTicketActive className={cls.IconTicketActive} />

      <div className={cls.item}>
        <Button className={cls.btn}>Сделано</Button>
        <img className={cls.money} src={ImgMoney} alt="приз" />
      </div>
    </div>
  );
};
