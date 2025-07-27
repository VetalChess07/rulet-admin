import { DailyBonuses, DailyBonusesStatus } from '../types/dailyBonuses';

import { DailyBonusesRewardClaimed } from '../../ui/DailyBonusesRewardClaimed/DailyBonusesRewardClaimed';
import { DailyBonusesLocked } from '../../ui/DailyBonusesLocked/DailyBonusesLocked';
import { DailyBonusesClaimDailyReward } from '../../ui/DailyBonusesClaimDailyReward/DailyBonusesClaimDailyReward';
import { Dispatch, SetStateAction } from 'react';

type GetDailyBonusComponentByStatusParams = {
  data: DailyBonuses;
  setState: Dispatch<SetStateAction<DailyBonuses[] | undefined>>;
  index: number;
};

export const getDailyBonusComponentByStatus = ({
  data,
  setState,
  index,
}: GetDailyBonusComponentByStatusParams) => {
  switch (data.status) {
    case DailyBonusesStatus.CLAIMED:
      return <DailyBonusesClaimDailyReward day={data.day} />;
    case DailyBonusesStatus.AVAILABLE:
      return (
        <DailyBonusesRewardClaimed
          setState={setState}
          text={'Взять билет!'}
          index={index}
        />
      );
    case DailyBonusesStatus.LOCKED:
      return <DailyBonusesLocked day={data.day} />;
    default:
      return null;
  }
};
