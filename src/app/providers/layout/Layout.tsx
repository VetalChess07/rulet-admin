import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from '@/widgets/Header/Header';

import cls from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={cls.main}>
        <Container className={cls.container}>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default Layout;
