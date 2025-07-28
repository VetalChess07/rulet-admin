import { MainBanner } from '@/entities/main';
import { Roulette } from '@/entities/roulette';
import { DailyBonuses } from '@/entities/dailyBonuses';
import { Tasks } from '@/entities/tasks';

const Main = () => {
  return (
    <>
      <MainBanner />
      <Roulette />
      <DailyBonuses />
      <Tasks />
    </>
  );
};

export default Main;
