import CircularProgress from '@mui/material/CircularProgress';
import { PrizesList } from '../PrizesList/PrizesList';

import cls from './Prizes.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useGetPrizes } from '../../model/lib/hook/useGetPrizes';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

export const Prizes = () => {
  const { error, isLoading, prizes, refetch } = useGetPrizes();
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
