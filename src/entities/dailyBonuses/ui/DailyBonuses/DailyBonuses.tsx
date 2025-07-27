import { DailyBonusesList } from '../DailyBonusesList/DailyBonusesList';
import { Typography } from '@mui/material';

import cls from './DailyBonuses.module.scss';

export const DailyBonuses = () => {
  return (
    <div className={cls.DailyBonuses}>
      <Typography variant="body2">
        Не забывай отмечаться и получай по халявной попытке каждый день!
      </Typography>
      <DailyBonusesList />
    </div>
  );
};
