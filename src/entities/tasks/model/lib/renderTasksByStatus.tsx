import { Dispatch, SetStateAction } from 'react';
import { TasksListItemCompleted } from '../../ui/TasksListItemCompleted/TasksListItemCompleted';
import { TasksListItemNotCompleted } from '../../ui/TasksListItemNotCompleted/TasksListItemNotCompleted';
import { Task, TaskStatus } from '../types/tasks';

interface RenderTasksByStatusParams {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const renderTasksByStatus = ({
  task,
  setTasks,
}: RenderTasksByStatusParams) => {
  switch (task.status) {
    case TaskStatus.NOTCOMPLETED:
      return <TasksListItemNotCompleted task={task} />;
    case TaskStatus.RECEIVED:
      return <TasksListItemCompleted setTasks={setTasks} task={task} />;
    default:
      return null;
  }
};
