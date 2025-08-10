import { Button, Typography } from '@mui/material';

import TicketIcon from '@shared/assets/icons/Ticket.svg?react';

import cls from './RouletteFooter.module.scss';

interface RouletteFooterProps {
  onClick: () => void;
  disabled: boolean;
}

export const RouletteFooter = (props: RouletteFooterProps) => {
  const { disabled, onClick } = props;

  return (
    <div className={cls.RouletteFooter}>
      <Typography variant="body2">
        Получите предмет, если 4 слота совпадут
      </Typography>
      <Typography variant="h2" className={cls.courtTicket}>
        x3 <TicketIcon />
      </Typography>
      <Button className={cls.btn} onClick={onClick} disabled={disabled}>
        {disabled ? 'Крутим...' : 'Крутить'}
      </Button>
    </div>
  );
};
