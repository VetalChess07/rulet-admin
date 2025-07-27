import { useState } from 'react';
import cls from './DailyBonusesList.module.scss';
import {
  DailyBonuses,
  DailyBonusesStatus,
} from '../../model/types/dailyBonuses';
import { getDailyBonusComponentByStatus } from '../../model/lib/getDailyBonusComponentByStatus';

export const DailyBonusesList = () => {
  const [state, setState] = useState<DailyBonuses[] | undefined>([
    { day: 'Понедельник', status: DailyBonusesStatus.CLAIMED },
    { day: 'Вторник', status: DailyBonusesStatus.CLAIMED },
    { day: 'Среда', status: DailyBonusesStatus.CLAIMED },
    { day: 'Четверг', status: DailyBonusesStatus.CLAIMED },
    { day: 'Пятница', status: DailyBonusesStatus.AVAILABLE },
    { day: 'Суббота', status: DailyBonusesStatus.LOCKED },
    { day: 'Воскресенье', status: DailyBonusesStatus.LOCKED },
  ]);

  if (!state) return null;

  return (
    <div className={cls.DailyBonusesList}>
      {state?.map((item, index) =>
        getDailyBonusComponentByStatus({ data: item, setState, index }),
      )}
    </div>
  );
};
