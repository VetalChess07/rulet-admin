import { useEffect } from 'react';
import { onAuth } from '../model/onAuth';

const TELEGRAM_BOT_NAME = import.meta.env.VITE_TG_BOT_NAME || '';

export const TelegramAuthWidget = () => {
  useEffect(() => {
    const container = document.getElementById('telegram-login-widget');
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;

    script.setAttribute('data-telegram-login', TELEGRAM_BOT_NAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    container.appendChild(script);

    (window as any).onTelegramAuth = (userData: any) => {
      onAuth(userData);
    };

    return () => {
      delete (window as any).onTelegramAuth;
      container.innerHTML = '';
    };
  }, [onAuth]);

  return <div id="telegram-login-widget" />;
};
