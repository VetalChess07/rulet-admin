import logoGame from '@shared/assets/icons/logo.svg';

import cls from './LogoGame.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getCurrentTheme } from '@/entities/themes/model/selectors/theme.selectors';
import { memo } from 'react';

const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

interface LogoGameProps {
  className?: string;
}

export const LogoGame = memo((props: LogoGameProps) => {
  const { className } = props;

  const theme = useAppSelector(getCurrentTheme);

  const path = `${VITE_API_IMAGE_URL}${theme?.logo}`;
  return (
    <img
      src={path ?? logoGame}
      alt={theme?.name ?? 'game'}
      className={classNames(cls.LogoGame, {}, [className])}
    />
  );
});
