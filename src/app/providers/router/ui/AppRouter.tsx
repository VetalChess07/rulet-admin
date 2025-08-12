import { FC, Suspense, useCallback } from 'react';
import { Routes, Route, RouteObject } from 'react-router-dom';
// эт чуть позже поправлю
import Layout from '../../layout/Layout';
import { CircularProgress } from '@mui/material';

import { routeConfig } from '@/shared/config/routeConfig/model/const/routeConfig';

const AppRouter: FC = () => {
  const renderWithWrapper = useCallback((route: RouteObject) => {
    const element = (
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center h-[100vh]">
            <CircularProgress />
          </div>
        }
      >
        {route.element}
      </Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        {Object.values(routeConfig).map(renderWithWrapper)}
      </Route>
    </Routes>
  );
};

export default AppRouter;
