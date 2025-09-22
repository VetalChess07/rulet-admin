import logoGame from '@shared/assets/icons/logo.svg';

import cls from './LogoGame.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getCurrentTheme } from '@/entities/themes/model/selectors/theme.selectors';
import { memo } from 'react';
import { Loader } from '@/shared/ui/Loader/Loader';

const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

interface LogoGameProps {
  className?: string;
}

export const LogoGame = memo((props: LogoGameProps) => {
  const { className } = props;

  const theme = useAppSelector(getCurrentTheme);

  console.log(theme);

  const path = theme?.logo ? `${VITE_API_IMAGE_URL}${theme.logo}` : logoGame;

  return (
    <img
      src={path}
      alt={theme?.name ?? 'game'}
      className={classNames(cls.LogoGame, {}, [className])}
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== logoGame) {
          target.src = logoGame;
        }
      }}
      onLoad={() => <Loader />}
    />
  );
});
