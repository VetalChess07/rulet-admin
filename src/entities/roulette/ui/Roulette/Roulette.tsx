import { RouletteHeader } from '../RouletteHeader/RouletteHeader';
import { RouletteGame } from '../RouletteGame/RouletteGame';

import cls from './Roulette.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Prize } from '@/entities/prizes';

interface RouletteProps {
  error: string | null;
  isLoading: boolean;
  prizes: Prize[] | null;
  refetch: () => void;
}

export const Roulette = (props: RouletteProps) => {
  const { error, isLoading, prizes, refetch } = props;

  return (
    <div className={classNames(cls.Roulette, {}, ['container'])}>
      <RouletteHeader />
      <RouletteGame
        error={error}
        isLoading={isLoading}
        prizes={prizes}
        refetch={refetch}
      />
    </div>
  );
};
