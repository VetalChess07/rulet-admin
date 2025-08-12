import { Box } from '@mui/material';
import cls from './Nav.module.scss';

import { navRoutes } from '@/shared/config/routeConfig';
import { Link } from 'react-router-dom';

interface NavProps {
  isTgWidget?: boolean;
}

export const Nav = (props: NavProps) => {
  const { isTgWidget } = props;

  return (
    <Box
      component="aside"
      display="flex"
      flexDirection="column"
      className={cls.Nav}
    >
      <ul className={cls.list}>
        {navRoutes.map((route) => (
          <Link className={cls.link} to={route.path} key={route.label}>
            {route.label}
          </Link>
        ))}
      </ul>
    </Box>
  );
};
