import { MainBanner } from '@/entities/main';
import { Roulette } from '@/entities/roulette';
import { DailyBonuses } from '@/entities/dailyBonuses';
import { Tasks } from '@/entities/tasks';
import { Prizes, useGetPrizes } from '@/entities/prizes';

const Main = () => {
  const { error, isLoading, prizes, refetch } = useGetPrizes();

  return (
    <>
      <MainBanner />
      <Roulette
        error={error}
        isLoading={isLoading}
        prizes={prizes}
        refetch={refetch}
      />
      <Prizes
        error={error}
        isLoading={isLoading}
        prizes={prizes}
        refetch={refetch}
      />
      <DailyBonuses />
      <Tasks />
    </>
  );
};

export default Main;
