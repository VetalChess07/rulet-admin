import { Typography } from '@mui/material';

import { Link } from 'react-router-dom';

import cls from './Footer.module.scss';
import { BottomNavigation } from '../BottomNavigation/BottomNavigation';

export const Footer = () => {
  return (
    <>
      <BottomNavigation />
      <footer className={cls.Footer}>
        <div className={cls.item}>
          <Typography className={cls.copyrating} variant="body1">
            © 2025 Donatov.net
          </Typography>
          <span className={cls.pont}>∙</span>
          <Typography className={cls.copyrating} variant="body1">
            Все права защищены
          </Typography>
        </div>
        <div className={cls.item}>
          <Link className={cls.link} to={'/privacy-policy'}>
            Политика конфиденциальности
          </Link>
          <Link className={cls.link} to={'/processing-of-personal-data'}>
            Обработка персональных данных
          </Link>
        </div>
      </footer>
    </>
  );
};
