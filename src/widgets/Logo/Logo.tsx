import logo from '@shared/assets/icons/logo.svg';

import cls from './Logo.module.scss';

export const Logo = () => {
  return <img src={logo} alt="donatov.net" className={cls.Logo} />;
};
