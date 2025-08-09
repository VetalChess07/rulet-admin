import { createContext } from 'react';
import { TelegramAuthContextType } from '../../types/tg';

export const TelegramAuthContext = createContext<
  TelegramAuthContextType | undefined
>(undefined);
