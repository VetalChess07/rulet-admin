import { RouteObject } from 'react-router-dom';

import MainPage from '@pages/MainPage/MainPage';
import { PizesPageAsync } from '@/pages/PizesPage/PizesPage.async';
import { DailyBonusesPageAsync } from '@/pages/DailyBonusesPage/DailyBonusesPage.async';
import { TasksPageAsync } from '@/pages/TasksPage/TasksPage.async';
import { ThemesPageAsync } from '@/pages/Themes/ThemesPage.async';
import { DocsPageAsync } from '@/pages/Docs/DocsPage.async';

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export enum AppRoutes {
  // MAIN = 'main',
  NOT_FOUND = 'not_found',
  PRIZES = 'prizes',
  DAILYBONUS = 'daily_bonuses',
  TASKS = 'tasks',
  THEMES = 'themes',
  // DOCS = 'docs',
}

export const RoutePath: Record<AppRoutes, string> = {
  // [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.PRIZES]: '/prizes',
  [AppRoutes.DAILYBONUS]: '/daily_bonuses',
  [AppRoutes.TASKS]: '/tasks',
  [AppRoutes.THEMES]: '/themes',
  // [AppRoutes.DOCS]: '/docs',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  // [AppRoutes.MAIN]: {
  //   path: RoutePath[AppRoutes.MAIN],
  //   element: <MainPage />,
  // },

  [AppRoutes.THEMES]: {
    path: RoutePath[AppRoutes.THEMES],
    element: <ThemesPageAsync />,
  },

  [AppRoutes.PRIZES]: {
    path: RoutePath[AppRoutes.PRIZES],
    element: <PizesPageAsync />,
  },

  [AppRoutes.DAILYBONUS]: {
    path: RoutePath[AppRoutes.DAILYBONUS],
    element: <DailyBonusesPageAsync />,
  },

  [AppRoutes.TASKS]: {
    path: RoutePath[AppRoutes.TASKS],
    element: <TasksPageAsync />,
  },

  // [AppRoutes.DOCS]: {
  //   path: RoutePath[AppRoutes.DOCS],
  //   element: <DocsPageAsync />,
  // },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
