import React, { Dispatch, SetStateAction } from 'react';

import IconTicketActive from '@shared/assets/icons/ticketActive.svg?react';

import cls from './DailyBonusesRewardClaimed.module.scss';
import { Typography } from '@mui/material';
import {
  DailyBonuses,
  DailyBonusesStatus,
} from '../../model/types/dailyBonuses';

interface DailyBonusesRewardClaimedProps {
  text: string;
  setState: Dispatch<SetStateAction<DailyBonuses[] | undefined>>;
  index: number;
}

export const DailyBonusesRewardClaimed = (
  props: DailyBonusesRewardClaimedProps,
) => {
  const { text, setState, index } = props;

  const handleClick = () => {
    setState((prev) =>
      prev
        ? prev.map((item, i) =>
            i === index
              ? { ...item, status: DailyBonusesStatus.CLAIMED }
              : item,
          )
        : prev,
    );
  };

  return (
    <div className={cls.DailyBonusesRewardClaimed} onClick={handleClick}>
      <IconTicketActive />
      <Typography className={cls.text} variant="body2">
        {text}
      </Typography>
    </div>
  );
};
