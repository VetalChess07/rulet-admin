import React, { useEffect, useState } from 'react';
import { User } from '../../types/tg';
import { TelegramAuthContext } from './telegramAuthContext';

export const TelegramAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [widgetVisible, setWidgetVisible] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('tgUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = () => setWidgetVisible(true);

  const logout = () => {
    localStorage.removeItem('tgUser');
    setUser(null);
  };

  return (
    <TelegramAuthContext.Provider
      value={{ user, setUser, login, logout, widgetVisible, setWidgetVisible }}
    >
      {children}
    </TelegramAuthContext.Provider>
  );
};
