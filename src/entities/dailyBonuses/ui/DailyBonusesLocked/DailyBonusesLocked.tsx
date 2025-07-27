import IconTicketActive from '@shared/assets/icons/ticketActive.svg?react';
import { Typography } from '@mui/material';

import cls from './DailyBonusesLocked.module.scss';

interface DailyBonusesLockedProps {
  day: string;
}

export const DailyBonusesLocked = (props: DailyBonusesLockedProps) => {
  const { day } = props;

  return (
    <div className={cls.DailyBonusesLocked}>
      <IconTicketActive />
      <Typography className={cls.text} variant="body2">
        {day}
      </Typography>
    </div>
  );
};
