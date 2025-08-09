import { MainBanner } from '@/entities/main';
import { Roulette } from '@/entities/roulette';
import { DailyBonuses } from '@/entities/dailyBonuses';
import { Tasks } from '@/entities/tasks';
import { Prizes } from '@/entities/prizes';

const SuccessAuthByTg = () => {
  return (
    <>
      <MainBanner />
      <Roulette />
      <Prizes />
      <DailyBonuses />
      <Tasks />
    </>
  );
};

export default SuccessAuthByTg;
