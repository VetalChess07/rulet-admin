import { CSSProperties } from 'react';
import { SlotData } from '../../model/types/roulette';

import cls from './VerticalSlotItem.module.scss';

interface VerticalSlotItemProps {
  style?: CSSProperties;
  slot: SlotData;
}

export const VerticalSlotItem = (props: VerticalSlotItemProps) => {
  const { style, slot } = props;

  return (
    <div className={cls.VerticalSlotItem} style={style}>
      <div className={cls.item}>
        <img className={cls.img} src={slot[0]} alt="приз" />
      </div>
      <div className={cls.item}>
        <img className={cls.img} src={slot[0]} alt="приз" />
      </div>
      <div className={cls.item}>
        <img className={cls.img} src={slot[0]} alt="приз" />
      </div>
    </div>
  );
};
