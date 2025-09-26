import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { FormControl, SelectChangeEvent, Typography } from '@mui/material';
import { Select } from '@/shared/ui/Select/Select';

import { prizeTypeSelectOptions } from '../../model/const/prizeTypeSelectOptions';
import { PrizeType } from '../../model/types/prizes';
import { PrizeFormData } from '../../model/types/createPrize';

interface SelectPrizeTypeProps {
  value: PrizeType;
  setFormData: Dispatch<SetStateAction<PrizeFormData>>;
}

export const SelectPrizeType = memo((props: SelectPrizeTypeProps) => {
  const { setFormData, value } = props;

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | number>) => {
      const newValue = event.target.value as PrizeType;
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
        Тип приза
      </Typography>
      <Select
        sx={{ padding: '12px ' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        options={prizeTypeSelectOptions}
        value={value}
      />
    </FormControl>
  );
});
