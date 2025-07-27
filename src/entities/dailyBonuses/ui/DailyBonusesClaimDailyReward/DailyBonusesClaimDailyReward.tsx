import ApproveIcon from '@shared/assets/icons/approve.svg?react';

import cls from './DailyBonusesClaimDailyReward.module.scss';
import { Typography } from '@mui/material';

interface DailyBonusesClaimDailyRewardProps {
  day: string;
}

export const DailyBonusesClaimDailyReward = (
  props: DailyBonusesClaimDailyRewardProps,
) => {
  const { day } = props;

  return (
    <div className={cls.DailyBonusesClaimDailyReward}>
      <ApproveIcon />
      <Typography variant="body2">{day}</Typography>
    </div>
  );
};
