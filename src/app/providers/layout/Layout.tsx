import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from '@/widgets/Header/Header';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-start items-start w-full min-h-[90dvh] mt-14 ">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default Layout;
