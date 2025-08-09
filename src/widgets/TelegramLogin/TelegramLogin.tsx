import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TelegramLogin = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем есть ли сохранённый пользователь
    const savedUser = localStorage.getItem('tgUser');
    console.log(savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) return; // Если уже залогинен, не нужно добавлять скрипт

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;

    script.setAttribute(
      'data-telegram-login',
      import.meta.env.VITE_TG_BOT_NAME || '',
    );
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');

    (window as any).onTelegramAuth = (userData: any) => {
      console.log('TG user data:', userData);
      localStorage.setItem('tgUser', JSON.stringify(userData));
      setUser(userData);
    };

    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    const container = document.getElementById('telegram-login-btn');
    container?.appendChild(script);

    return () => {
      delete (window as any).onTelegramAuth;
      container && (container.innerHTML = '');
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('tgUser');
    setUser(null);
  };

  console.log(user);

  return (
    <>
      {user ? (
        <button onClick={handleLogout} style={{ marginTop: 20 }}>
          Logout Telegram
        </button>
      ) : (
        <div id="telegram-login-btn" style={{ marginTop: 20 }}></div>
      )}
    </>
  );
};
