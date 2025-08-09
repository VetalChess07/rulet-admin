import React from 'react';
import { Prize } from '../../model/types/prizes';

import cls from './PrizesListItem.module.scss';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface PrizesListItemProps {
  prize: Prize;
}

export const PrizesListItem = (props: PrizesListItemProps) => {
  const { prize } = props;

  return (
    <div className={cls.PrizesListItem}>
      <img
        className={cls.img}
        src={`${imgApi}${prize.picture}`}
        alt={prize.name}
      />
    </div>
  );
};
