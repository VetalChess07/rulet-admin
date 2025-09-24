export type PrizeType = 'attempt' | 'value';

export interface Prize {
  id: number;
  themeId: number | null;
  name: string;
  picture: string;
  description: string;
  attempt?: number | null;
  type: PrizeType;
  procent: number;
  created_at: Date | null;
  updated_at: Date | null;
}
