import cls from './DailyBonusesRewardClaimed.module.scss';
import { DailyBonuses } from '../../model/types/dailyBonuses';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface DailyBonusesRewardClaimedProps {
  event: DailyBonuses;
  refetch: () => void;
}

export const DailyBonusesRewardClaimed = (
  props: DailyBonusesRewardClaimedProps,
) => {
  const { event, refetch } = props;

  return (
    <div className={cls.DailyBonusesRewardClaimed} onClick={refetch}>
      <img className={cls.img} src={`${imgApi}${event.picture}`} alt="" />
    </div>
  );
};
