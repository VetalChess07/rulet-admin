export type SlotData = [string, string, string, 'win' | 'lose'];

export interface Game {
  id: number;
  name: string;
  picture: string;
  description: string;
  type: string;
  createdAt: string; // ISO дата
  updatedAt: string; // ISO дата
}

export interface GetResultGameResponse {
  status: number;
  prizes: Game[];
  prizes_value: string;
  isJackpot: boolean;
}
