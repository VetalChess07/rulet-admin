import cls from './Header.module.scss';
import { Logo } from '../Logo/Logo';
import { LogoGame } from '../LogoGame/LogoGame';
import { TelegramLogin } from '../TelegramLogin/TelegramLogin';
import { memo } from 'react';

export const Header = memo(() => (
  <header className={cls.Header}>
    <Logo />
    <LogoGame className={cls.logoGame} />
    <TelegramLogin />
  </header>
));
