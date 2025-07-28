import { DailyBonusesList } from '../DailyBonusesList/DailyBonusesList';
import { Typography } from '@mui/material';

import cls from './DailyBonuses.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export const DailyBonuses = () => {
  return (
    <div className={classNames(cls.DailyBonuses, {}, ['container'])}>
      <Typography variant="body2">
        Не забывай отмечаться и получай по халявной попытке каждый день!
      </Typography>
      <DailyBonusesList />
    </div>
  );
};
