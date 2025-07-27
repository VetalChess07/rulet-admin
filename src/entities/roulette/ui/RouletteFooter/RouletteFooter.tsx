import { Button, Typography } from '@mui/material';

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
        Получите предмет, если 3 слота совпадут
      </Typography>
      <Button className={cls.btn} onClick={onClick} disabled={disabled}>
        {disabled ? 'Крутим...' : 'Крутить'}
      </Button>
    </div>
  );
};
