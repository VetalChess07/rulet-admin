import { Nav } from '@/widgets/Nav/Nav';

import cls from './Header.module.scss';

export const Header = () => (
  <header className={cls.Header}>
    <Nav />
  </header>
);
