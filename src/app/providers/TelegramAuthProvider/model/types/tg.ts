import { Dispatch, SetStateAction } from 'react';

export type User = any;

export type TelegramAuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (user: any) => void;
  logout: () => void;
  widgetVisible: boolean;
  setWidgetVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
