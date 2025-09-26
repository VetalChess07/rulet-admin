import type { Daily } from './dailys';

export type DailyFormData = Omit<Daily, 'id'>;
