import cls from './DailyBonusesList.module.scss';

import { useGetAllEvents } from '../../model/lib/hook/useGetAllEvents';
import { CircularProgress } from '@mui/material';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { getDailyBonusComponentByStatus } from '../../model/lib/getDailyBonusComponentByStatus';
import { checkDailiyBonuses } from '../../model/servise/checkDailiyBonuses';
import { useState } from 'react';
import { TG_USER } from '@/shared/conts/localStorage';
import { DailyBonusesLocked } from '../DailyBonusesLocked/DailyBonusesLocked';

export const DailyBonusesList = () => {
  const { error, isLoading, refetch, allEvents } = useGetAllEvents();

  const [isLoadingCheck, setIsLoadingCheck] = useState(false);
  const [errorCheck, setErrorCheck] = useState<string | null>('');

  const onHandleDailyBonus = async (id: number) => {
    await checkDailiyBonuses({
      id,
      setError: setErrorCheck,
      setIsLoading: setIsLoadingCheck,
    });
    refetch();
  };
  const isAuth = localStorage.getItem(TG_USER);

  if (isLoading || isLoadingCheck)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <>
      {errorCheck && (
        <ErrorAlert message={errorCheck} sx={{ marginTop: '24px' }} />
      )}
      <div className={cls.DailyBonusesList}>
        {allEvents?.map((event) => {
          if (isAuth) {
            return getDailyBonusComponentByStatus({
              data: event,
              onSave: () => onHandleDailyBonus(event.event.id),
            });
          }
          return <DailyBonusesLocked data={event} />;
        })}
      </div>
    </>
  );
};
