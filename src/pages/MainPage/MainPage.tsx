import { MainBanner } from '@/entities/main';
import { Roulette } from '@/entities/roulette';
import { DailyBonuses } from '@/entities/dailyBonuses';

const Main = () => {
  return (
    <>
      <MainBanner />
      <Roulette />
      <DailyBonuses />
    </>
  );
};

export default Main;
