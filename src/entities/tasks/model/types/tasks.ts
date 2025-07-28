export enum TaskStatus {
  RECEIVED = 'RECEIVED',
  NOTCOMPLETED = 'NOTCOMPLETED',
}
export interface Task {
  id: string;
  status: TaskStatus;
  title: string;
  task: string;
  description: string;
}
