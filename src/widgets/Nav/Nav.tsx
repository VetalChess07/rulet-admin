import { LoginButton } from '@/widgets/LoginButton/LoginButton';
import { LogoGame } from '@/widgets/LogoGame/LogoGame';
import { Logo } from '@/widgets/Logo/Logo';

import cls from './Nav.module.scss';
import { TelegramLogin } from '../TelegramLogin/TelegramLogin';

export const Nav = () => {
  return (
    <div className={cls.Nav}>
      <Logo />
      <LogoGame className={cls.logoGame} />
      <LoginButton />
      {/* <TelegramLogin /> */}
    </div>
  );
};
