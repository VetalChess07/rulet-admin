import type { INavRoute } from '../types/routeConfig';

export const navRoutes: INavRoute[] = [
  {
    label: 'Главная',
    path: '/',
  },
  {
    label: 'Призы',
    path: '/prizes',
  },
  {
    label: 'Мероприятия',
    path: '/daily_bonuses',
    onlyAnonymous: true,
  },
  {
    label: 'Задания',
    path: '/tasks',
  },
];
