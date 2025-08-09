import cls from './DailyBonusesList.module.scss';

import { useGetAllEvents } from '../../model/lib/hook/useGetAllEvents';
import { CircularProgress } from '@mui/material';
import { DailyBonusesRewardClaimed } from '../DailyBonusesRewardClaimed/DailyBonusesRewardClaimed';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

export const DailyBonusesList = () => {
  const { error, isLoading, refetch, allEvents } = useGetAllEvents();

  if (isLoading)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error || allEvents == null)
    return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <div className={cls.DailyBonusesList}>
      {allEvents?.map((event) => (
        <DailyBonusesRewardClaimed
          key={event.id}
          refetch={refetch}
          event={event}
        />
      ))}
    </div>
  );
};
