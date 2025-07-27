import React from 'react';
import { RouletteHeader } from '../RouletteHeader/RouletteHeader';
import { RouletteGame } from '../RouletteGame/RouletteGame';

import cls from './Roulette.module.scss';

export const Roulette = () => {
  return (
    <div className={cls.Roulette}>
      <RouletteHeader />
      <RouletteGame />
    </div>
  );
};
