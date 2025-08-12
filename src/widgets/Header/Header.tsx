import { Nav } from '@/widgets/Nav/Nav';

import cls from './Header.module.scss';
import { Logo } from '../Logo/Logo';
import { LogoGame } from '../LogoGame/LogoGame';
import { TelegramLogin } from '../TelegramLogin/TelegramLogin';

export const Header = () => (
  <header className={cls.Header}>
    <Logo />
    <LogoGame className={cls.logoGame} />
    <TelegramLogin />
  </header>
);
