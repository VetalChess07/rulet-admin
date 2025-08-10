import CircularProgress from '@mui/material/CircularProgress';
import { PrizesList } from '../PrizesList/PrizesList';

import cls from './Prizes.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { Prize } from '../../model/types/prizes';

interface PrizesProps {
  error: string | null;
  isLoading: boolean;
  prizes: Prize[] | null;
  refetch: () => void;
}

export const Prizes = (props: PrizesProps) => {
  const { error, isLoading, prizes, refetch } = props;

  if (isLoading)
    return (
      <div className={classNames(cls.laoder, {}, ['container'])}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <section className={classNames(cls.Prizes, {}, ['container'])}>
      <PrizesList prizes={prizes} />
    </section>
  );
};
