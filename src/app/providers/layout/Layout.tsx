import React, { useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer/Footer';

import cls from './Layout.module.scss';
import { Nav } from '@/widgets/Nav/Nav';
import { useInitialEffect } from '@/shared/hook/useInitialEffect/useInitialEffect';
import { checkIsAdmin } from '@/features/checkISAdmin';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

const Layout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  useInitialEffect(() => {
    checkIsAdmin({ setError, setIsLoading });
  });

  if (isLoading)
    return (
      <div className={cls.loader}>
        <CircularProgress />
      </div>
    );

  return (
    <Box
      className={cls.Layout}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      width="100%"
    >
      {error && <ErrorAlert message={`${error}`} />}
      <Header />
      <Box display="flex" flex={1} minHeight={0}>
        <Nav />

        <Box className={cls.main} component="main" flex={1} minWidth={0} py={2}>
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Box>
      </Box>
      <Footer /> {/* Подвал внизу */}
    </Box>
  );
};

export default Layout;
