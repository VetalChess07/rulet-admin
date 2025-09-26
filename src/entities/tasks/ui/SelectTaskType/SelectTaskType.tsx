import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { FormControl, SelectChangeEvent, Typography } from '@mui/material';
import { Select } from '@/shared/ui/Select/Select';

import { taskTypeSelectOptions } from '../../model/conts/taskTypeSelectOptions';
import { TaskType } from '../../model/types/tasks';
import { TasksFormData } from '../../model/types/createTasks';

interface SelectPrizeTypeProps {
  value: TaskType;
  setFormData: Dispatch<SetStateAction<TasksFormData>>;
}

export const SelectTaskType = memo((props: SelectPrizeTypeProps) => {
  const { setFormData, value } = props;

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | number>) => {
      const newValue = event.target.value as TaskType;
      setFormData((prev) => ({
        ...prev,
        type: newValue,
      }));
    },
    [setFormData],
  );
  return (
    <FormControl fullWidth>
      <Typography sx={{ mb: '8px' }} component={'label'}>
        Тип задания
      </Typography>
      <Select
        sx={{ padding: '12px ' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        options={taskTypeSelectOptions}
        value={value}
      />
    </FormControl>
  );
});
