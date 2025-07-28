import React from 'react';
import { RouletteHeader } from '../RouletteHeader/RouletteHeader';
import { RouletteGame } from '../RouletteGame/RouletteGame';

import cls from './Roulette.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export const Roulette = () => {
  return (
    <div className={classNames(cls.Roulette, {}, ['container'])}>
      <RouletteHeader />
      <RouletteGame />
    </div>
  );
};
