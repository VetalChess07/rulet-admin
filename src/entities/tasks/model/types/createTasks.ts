import { Task } from './tasks';

export type TasksFormData = Omit<Task, 'id'>;
