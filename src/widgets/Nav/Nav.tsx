import { LogoGame } from '@/widgets/LogoGame/LogoGame';
import { Logo } from '@/widgets/Logo/Logo';

import cls from './Nav.module.scss';
import { TelegramLogin } from '../TelegramLogin/TelegramLogin';

interface NavProps {
  isTgWidget?: boolean;
}

export const Nav = (props: NavProps) => {
  const { isTgWidget } = props;

  return (
    <div className={cls.Nav}>
      <Logo />
      <LogoGame className={cls.logoGame} />

      {isTgWidget && <TelegramLogin />}
    </div>
  );
};
