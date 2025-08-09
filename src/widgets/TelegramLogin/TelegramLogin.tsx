import { useEffect } from 'react';

export const TelegramLogin = () => {
  useEffect(() => {
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
    script.setAttribute(
      'data-auth-url',
      `https://${import.meta.env.VITE_DATA_AUTH_URL}/`,
    );

    document.getElementById('telegram-login-btn')?.appendChild(script);
  }, []);

  return <div id="telegram-login-btn" />;
};
