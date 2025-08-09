import { RouteObject, Navigate } from 'react-router-dom';

import MainPage from '@pages/MainPage/MainPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { SuccessAuthByTgAsync } from '@/pages/SuccessAuthByTg/SuccessAuthByTg.async';

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not_found',
  REDIRECT = 'success',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.REDIRECT]: '/:any',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.REDIRECT]: {
    path: RoutePath[AppRoutes.REDIRECT],
    element: <SuccessAuthByTgAsync />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
