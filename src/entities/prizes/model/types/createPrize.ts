import type { Prize } from './prizes';

export type PrizeFormData = Omit<Prize, 'id'>;
