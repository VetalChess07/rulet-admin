import cls from './TelegramLogin.module.scss';
import {
  TelegramAuthWidget,
  useTelegramAuth,
} from '@/app/providers/TelegramAuthProvider';

export const TelegramLogin = () => {
  const { user, logout, login } = useTelegramAuth();

  return (
    <div className={cls.TelegramLogin}>
      {user ? (
        <button onClick={logout}>Logout Telegram</button>
      ) : (
        <span>
          <TelegramAuthWidget />
        </span>
      )}
    </div>
  );
};
