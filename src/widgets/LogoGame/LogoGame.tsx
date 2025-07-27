import logoGame from '@shared/assets/icons/logoGame.png';

import cls from './LogoGame.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LogoGameProps {
  className?: string;
}

export const LogoGame = (props: LogoGameProps) => {
  const { className } = props;

  return (
    <img
      src={logoGame}
      alt="donatov.net"
      className={classNames(cls.LogoGame, {}, [className])}
    />
  );
};
