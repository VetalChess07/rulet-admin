import { Typography } from '@mui/material';

import TicketIcon from '@shared/assets/icons/Ticket.svg?react';

import cls from './RouletteHeader.module.scss';

interface RouletteHeaderProps {
  attemp: number;
}

export const RouletteHeader = (props: RouletteHeaderProps) => {
  const { attemp } = props;

  console.log(attemp);

  return (
    <div className={cls.RouletteHeader}>
      <div className={cls.item}>
        <TicketIcon />
        <Typography className={cls.title} variant="h2">
          Потратить
          <Typography
            component={'span'}
            className={cls.titleAccent}
            variant="h2"
          >
            {' попытки'}
          </Typography>
        </Typography>
      </div>
      <Typography variant="h2" className={cls.courtTicket}>
        x{attemp} <TicketIcon />
      </Typography>
    </div>
  );
};
