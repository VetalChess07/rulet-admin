import { SelectTheme } from '@/entities/themes';
import { Button, Typography } from '@mui/material';

import cls from './PrizeHeader.module.scss';

interface PrizeHeaderProps {
  handleAddPrize: () => void;
}

const PrizeHeader = (props: PrizeHeaderProps) => {
  const { handleAddPrize } = props;

  return (
    <div className={cls.PrizeHeader}>
      <Typography component="h2" variant="h2">
        Призы
      </Typography>
      <div className={cls.item}>
        <Button variant="contained" color="primary" onClick={handleAddPrize}>
          Добавить приз
        </Button>
        <SelectTheme />
      </div>
    </div>
  );
};

export { PrizeHeader };
