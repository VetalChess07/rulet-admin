import ApproveIcon from '@shared/assets/icons/approve.svg?react';

import cls from './DailyBonusesDailyReceived.module.scss';
import { Typography } from '@mui/material';
import { DailyBonuses } from '../../model/types/dailyBonuses';

import dayjs from 'dayjs';

interface DailyBonusesDailyReceivedProps {
  data: DailyBonuses;
}

export const DailyBonusesDailyReceived = (
  props: DailyBonusesDailyReceivedProps,
) => {
  const { data } = props;
  const formatted = dayjs(data.event.date_event).format('DD.MM.YYYY');

  return (
    <div className={cls.DailyBonusesClaimDailyReward}>
      <ApproveIcon />
      <Typography variant="body2">{formatted}</Typography>
    </div>
  );
};
