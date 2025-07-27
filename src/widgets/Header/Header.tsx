import { LoginButton } from '../LoginButton/LoginButton';
import { Logo } from '../Logo/Logo';
import { LogoGame } from '../LogoGame/LogoGame';

import cls from './Header.module.scss';

export const Header = () => (
  <header className={cls.Header}>
    <div className={cls.inner}>
      <Logo />
      <LogoGame className={cls.logoGame} />
      <LoginButton />
    </div>
  </header>
);
