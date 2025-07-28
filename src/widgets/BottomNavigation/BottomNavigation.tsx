import { Nav } from '@/widgets/Nav/Nav';

import cls from './BottomNavigation.module.scss';

export const BottomNavigation = () => {
  return (
    <div className={cls.BottomNavigation}>
      <Nav />
    </div>
  );
};
