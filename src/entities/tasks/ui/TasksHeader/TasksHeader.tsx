import { SelectTheme } from '@/entities/themes';
import { Button, Typography } from '@mui/material';

import cls from './TasksHeader.module.scss';

interface TasksHeaderProps {
  handleAddPTask: () => void;
}

const TasksHeader = (props: TasksHeaderProps) => {
  const { handleAddPTask } = props;

  return (
    <div className={cls.TasksHeader}>
      <Typography component="h2" variant="h2">
        Задания
      </Typography>
      <div className={cls.item}>
        <Button variant="contained" color="primary" onClick={handleAddPTask}>
          Добавить задание
        </Button>
        <SelectTheme />
      </div>
    </div>
  );
};

export { TasksHeader };
