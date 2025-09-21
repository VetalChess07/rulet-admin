import { User } from '@/entities/user';
import { TG_USER } from './localStorage';

const userInfoString = localStorage.getItem(TG_USER);
export const userInfo: User | null = userInfoString
  ? JSON.parse(userInfoString)
  : null;
