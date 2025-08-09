export enum TaskStatus {
  RECEIVED = 'RECEIVED',
  NOTCOMPLETED = 'NOTCOMPLETED',
}
export interface Task {
  id: number;
  picture: string;
  name: string;
  description: string;
  attempt: number;
  api: string;
  type: 'API' | 'UI' | string; // если возможны и другие типы, добавь или замени на просто `string`
  params: string;
  createdAt: string;
  updatedAt: string;
}
