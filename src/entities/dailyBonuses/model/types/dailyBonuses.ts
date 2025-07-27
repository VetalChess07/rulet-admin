export enum DailyBonusesStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  CLAIMED = 'CLAIMED',
}

export interface DailyBonuses {
  day: string;
  status: DailyBonusesStatus;
}
