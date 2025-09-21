import {
  DatePicker as MUIDatePicker,
  DatePickerProps as MUIDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Box, SxProps, TypographyProps } from '@mui/material';
import { Theme } from '@emotion/react';
import Typography from '@mui/material/Typography';

interface CustomDatePickerProps
  extends Omit<MUIDatePickerProps<Dayjs>, 'value' | 'onChange' | 'format'> {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  label?: string;
  format?: string;
  labelVariant?: TypographyProps['variant'];
  sxLabel?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  placeholder?: string;
}

export const DatePicker = ({
  value,
  onChange,
  label = 'Дата',
  format = 'DD.MM.YYYY',
  sxLabel = {},
  sx = {},
  labelVariant,
  placeholder = '',
  ...rest
}: CustomDatePickerProps) => {
  return (
    <Box sx={{ width: '100%', margin: '0', ...sx }}>
      {label && (
        <Typography
          sx={{
            fontSize: '1rem',

            display: 'inline-block',
            ...sxLabel,
          }}
          component="span"
          textAlign="left"
          variant={labelVariant}
        >
          {label}
        </Typography>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <MUIDatePicker
          label={placeholder}
          value={value}
          onChange={onChange}
          format={format}
          {...rest}
        />
      </LocalizationProvider>
    </Box>
  );
};
