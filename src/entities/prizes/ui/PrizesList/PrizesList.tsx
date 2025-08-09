import { Prize } from '../../model/types/prizes';
import { PrizesListItem } from '../PrizesListItem/PrizesListItem';

import cls from './PrizesList.module.scss';

interface PrizesListProps {
  prizes?: Prize[] | null;
}

export const PrizesList = (props: PrizesListProps) => {
  const { prizes } = props;

  return (
    <div className={cls.PrizesList}>
      {prizes?.map((prize) => (
        <PrizesListItem key={prize.id} prize={prize} />
      ))}
    </div>
  );
};
