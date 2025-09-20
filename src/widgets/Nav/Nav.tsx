import { Box } from '@mui/material';
import cls from './Nav.module.scss';

import { navRoutes } from '@/shared/config/routeConfig';
import { NavLink, useLocation } from 'react-router-dom';
import { SelectTheme } from '../../entities/themes/ui/SelectTheme/SelectTheme';
import { memo } from 'react';

export const Nav = memo(() => {
  const location = useLocation();
  const search = location.search;

  return (
    <Box
      component="aside"
      display="flex"
      flexDirection="column"
      className={cls.Nav}
    >
      <ul className={cls.list}>
        <SelectTheme />
        {navRoutes.map((route) => (
          <NavLink
            key={route.label}
            to={`${route.path}${search}`}
            className={({ isActive }) =>
              `${cls.link} ${isActive ? cls.active : ''}`
            }
          >
            {route.Icon}
            <span>{route.label}</span>
          </NavLink>
        ))}
      </ul>
    </Box>
  );
});
