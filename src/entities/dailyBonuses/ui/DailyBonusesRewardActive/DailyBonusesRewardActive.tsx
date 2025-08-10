import cls from './DailyBonusesRewardActive.module.scss';
import { DailyBonuses } from '../../model/types/dailyBonuses';
import { Typography } from '@mui/material';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface DailyBonusesRewardActiveProps {
  data: DailyBonuses;
  onSave: (id: number) => void;
}

export const DailyBonusesRewardActive = (
  props: DailyBonusesRewardActiveProps,
) => {
  const { data, onSave } = props;

  return (
    <div
      onClick={() => onSave(data.event.id)}
      className={cls.DailyBonusesRewardClaimed}
    >
      <img className={cls.img} src={`${imgApi}${data.event.picture}`} alt="" />
      <Typography className={cls.text} variant="body2">
        Взять билет! {data.event.id}
      </Typography>
    </div>
  );
};
