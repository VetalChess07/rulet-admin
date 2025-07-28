import React from 'react';

import { Header } from '@/widgets/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/widgets/Footer/Footer';

import cls from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={cls.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
