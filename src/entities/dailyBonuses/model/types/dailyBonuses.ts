export enum DailyBonusesStatus {
  ENDTIME = 'end_time',
  ACTIVE = 'active',
  TIMELIMIT = 'time_limit',
}

export interface DailyBonuses {
  event: {
    id: number;
    picture: string;
    date_event: string;
  };
  visible: DailyBonusesStatus;
}

export interface DailyBonusesIsNoneAuth {
  createdAt: string;
  date_event: string;
  id: number;
  picture: string;
  updatedAt: string;
}
