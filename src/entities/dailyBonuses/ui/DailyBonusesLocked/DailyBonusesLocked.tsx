import IconTicketActive from '@shared/assets/icons/ticketActive.svg?react';
import { Typography } from '@mui/material';

import cls from './DailyBonusesLocked.module.scss';
import {
  DailyBonuses,
  DailyBonusesIsNoneAuth,
} from '../../model/types/dailyBonuses';
import dayjs from 'dayjs';

interface DailyBonusesLockedProps {
  data: DailyBonuses | DailyBonusesIsNoneAuth;
}

export const DailyBonusesLocked = (props: DailyBonusesLockedProps) => {
  const { data } = props;

  const formatted =
    'event' in data && data.event?.date_event
      ? dayjs(data.event.date_event).format('DD.MM.YYYY')
      : dayjs().format('DD.MM.YYYY');

  return (
    <div className={cls.DailyBonusesLocked}>
      <IconTicketActive />
      <Typography className={cls.text} variant="body2">
        {formatted}
      </Typography>
    </div>
  );
};
