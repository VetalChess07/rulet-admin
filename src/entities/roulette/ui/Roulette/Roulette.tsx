import { RouletteHeader } from '../RouletteHeader/RouletteHeader';
import { RouletteGame } from '../RouletteGame/RouletteGame';

import cls from './Roulette.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Prize } from '@/entities/prizes';
import { useGetAttemp } from '../../model/lib/hook/useGetAttemp';

interface RouletteProps {
  error: string | null;
  isLoading: boolean;
  prizes: Prize[] | null;
  refetch: () => void;
}

export const Roulette = (props: RouletteProps) => {
  const { error, isLoading, prizes } = props;

  const { attemp, refetch } = useGetAttemp();

  return (
    <div className={classNames(cls.Roulette, {}, ['container'])}>
      <RouletteHeader attemp={attemp ?? 0} />
      <RouletteGame
        error={error}
        isLoading={isLoading}
        prizes={prizes}
        refetch={refetch}
      />
    </div>
  );
};
