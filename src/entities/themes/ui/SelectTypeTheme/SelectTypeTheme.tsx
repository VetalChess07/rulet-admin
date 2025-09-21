import React, { JSX } from 'react';
import { SvgIcon } from '@mui/material';

import { RiCoinLine } from 'react-icons/ri';
import { TypeThemeGame } from '../../model/types/theme.types';
// import { GiTrophyCup } from 'react-icons/gi';
import { TbNumber100Small } from 'react-icons/tb';

import cls from './SelectTypeTheme.module.scss';

import { GiBandit } from 'react-icons/gi';

interface SelectTypeThemeProps {
  themeType: TypeThemeGame;
}

const iconMap: Record<TypeThemeGame, JSX.Element> = {
  roulette: <GiBandit size={32} />,
  'coin erasure': <RiCoinLine size={32} />,
  'win-win': <TbNumber100Small size={32} />,
};

const SelectTypeTheme: React.FC<SelectTypeThemeProps> = ({ themeType }) => {
  const icon = iconMap[themeType] || <SvgIcon />;

  return <div className={cls.SelectTypeTheme}>{icon}</div>;
};

export { SelectTypeTheme };
