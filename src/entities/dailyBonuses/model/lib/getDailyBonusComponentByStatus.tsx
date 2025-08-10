import { DailyBonuses, DailyBonusesStatus } from '../types/dailyBonuses';

import { DailyBonusesRewardActive } from '../../ui/DailyBonusesRewardActive/DailyBonusesRewardActive';
import { DailyBonusesLocked } from '../../ui/DailyBonusesLocked/DailyBonusesLocked';
import { DailyBonusesDailyReceived } from '../../ui/DailyBonusesDailyReceived/DailyBonusesDailyReceived';
import { Dispatch, SetStateAction } from 'react';

type GetDailyBonusComponentByStatusParams = {
  data: DailyBonuses;
  onSave: (id: number) => void;
};

export const getDailyBonusComponentByStatus = ({
  data,
  onSave,
}: GetDailyBonusComponentByStatusParams) => {
  switch (data.visible) {
    case DailyBonusesStatus.ENDTIME:
      return <DailyBonusesDailyReceived data={data} />;
    case DailyBonusesStatus.ACTIVE:
      return <DailyBonusesRewardActive onSave={onSave} data={data} />;
    case DailyBonusesStatus.TIMELIMIT:
      return <DailyBonusesLocked data={data} />;
    default:
      return null;
  }
};
