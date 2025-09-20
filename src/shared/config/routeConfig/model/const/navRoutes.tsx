import type { INavRoute } from '../types/routeConfig';
import { IoGameController } from 'react-icons/io5';
import { FaParachuteBox } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { FaTasks } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { SiGoogledocs } from 'react-icons/si';

export const navRoutes: INavRoute[] = [
  {
    label: 'Главная',
    path: '/',
    Icon: <FaHome />,
  },
  {
    label: 'Темы',
    path: '/themes',
    Icon: <IoGameController />,
  },
  {
    label: 'Призы',
    path: '/prizes',
    Icon: <FaParachuteBox />,
  },
  {
    label: 'Ежедневные задания',
    path: '/daily_bonuses',
    onlyAnonymous: true,
    Icon: <FaCalendarDays />,
  },
  {
    label: 'Задания',
    path: '/tasks',
    Icon: <FaTasks />,
  },
  {
    label: 'Документы',
    path: '/docs',
    Icon: <SiGoogledocs />,
  },
];
