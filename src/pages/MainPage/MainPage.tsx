import { MainBanner } from '@/entities/main';
import { Roulette } from '@/entities/roulette';
import { DailyBonuses } from '@/entities/dailyBonuses';
import { Tasks } from '@/entities/tasks';
import { BottomNavigation } from '@/widgets/BottomNavigation/BottomNavigation';

const Main = () => {
  return (
    <>
      <MainBanner />
      <Roulette />
      <DailyBonuses />
      <Tasks />
      <BottomNavigation />
    </>
  );
};

export default Main;
