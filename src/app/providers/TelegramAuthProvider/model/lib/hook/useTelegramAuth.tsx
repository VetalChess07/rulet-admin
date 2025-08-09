import { useContext } from 'react';
import { TelegramAuthContext } from '../context/telegramAuthContext';

export const useTelegramAuth = () => {
  const context = useContext(TelegramAuthContext);
  if (!context)
    throw new Error('useTelegramAuth must be used within TelegramAuthProvider');
  return context;
};
