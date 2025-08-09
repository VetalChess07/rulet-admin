import { Button } from '@mui/material';
import TgIcon from '@shared/assets/icons/tgIcon.svg?react';

import cls from './LoginButton.module.scss';

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton = (props: LoginButtonProps) => {
  const { onClick } = props;

  return (
    <Button
      onClick={onClick}
      className={cls.LoginButton}
      startIcon={<TgIcon />}
    >
      Выйти
    </Button>
  );
};
