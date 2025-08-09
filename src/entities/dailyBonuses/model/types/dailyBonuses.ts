export enum DailyBonusesStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  CLAIMED = 'CLAIMED',
}

export interface DailyBonuses {
  id: number;
  createdAt: string;
  picture: string;
  date_event: string;
  updatedAt: string;
}
