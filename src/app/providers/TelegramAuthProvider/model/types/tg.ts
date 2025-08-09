export type User = any;

export type TelegramAuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
  widgetVisible: boolean;
  setWidgetVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
