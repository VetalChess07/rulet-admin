import { SelectTheme } from '@/entities/themes';
import { Button, Typography } from '@mui/material';

import cls from './DailysHeader.module.scss';

interface DailysHeaderProps {
  handleAddPrize: () => void;
}

const DailysHeader = (props: DailysHeaderProps) => {
  const { handleAddPrize } = props;

  return (
    <div className={cls.DailysHeader}>
      <Typography component="h2" variant="h2">
        Ежедневные задания
      </Typography>
      <div className={cls.item}>
        <Button variant="contained" color="primary" onClick={handleAddPrize}>
          Добавить задание
        </Button>
        <SelectTheme />
      </div>
    </div>
  );
};

export { DailysHeader };
