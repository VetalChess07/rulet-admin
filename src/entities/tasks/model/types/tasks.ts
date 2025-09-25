export type TaskType = 'API' | 'PARTNER';

export interface Task {
  id: number;
  picture?: string;
  name: string;
  description: string | null;
  attempt: number;
  api_url: string;
  type: TaskType;
  link: string;
  themeId: number | null;
}

export interface TaskNoAuth {
  result: Task[];
}
