import { Button } from '@mui/material';
import TgIcon from '@shared/assets/icons/tgIcon.svg?react';

import cls from './LoginButton.module.scss';

export const LoginButton = () => {
  return (
    <Button className={cls.LoginButton} startIcon={<TgIcon />}>
      Войти
    </Button>
  );
};
