import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { DailyBonuses } from '../../model/types/dailyBonuses';
import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';
import { handleAddLogo } from '@/shared/lib/handleAddLogo';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';

import { updateDailyBonusEvent } from '@/features/dailyBonuses/model/service/updateDailyBonusEvent/updateDailyBonusEvent';

interface DailyBonusesDialogProps {
  open: boolean;
  onClose: () => void;
  dailyBonuses:
    | (DailyBonuses & Partial<{ name: string; description: string }>)
    | null;
  onSave: () => void;
}

export const DailyBonusesDialog: React.FC<DailyBonusesDialogProps> = ({
  open,
  onClose,
  dailyBonuses,
  onSave,
}) => {
  console.log(dailyBonuses);

  const [id, setId] = useState(dailyBonuses?.id);

  const [date, setDate] = useState<Dayjs | null>(
    dailyBonuses?.date_event ? dayjs(dailyBonuses.date_event) : null,
  );

  const [logo, setLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setId(dailyBonuses?.id);
    setDate(dailyBonuses?.date_event ? dayjs(dailyBonuses.date_event) : null);
  }, [dailyBonuses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      alert('Выберите дату события');
      return;
    }

    if (!id) {
      alert('ID мероприятия не указан');
      return;
    }

    setError(null);

    const res = await updateDailyBonusEvent({
      id,
      picture: logo,
      date_event: date,
      setIsLoading,
      setError,
    });

    console.log(res);

    if (res) {
      showSnackbar('Событие успешно обновлено', 'success');
      onSave();
      onClose();
    } else if (error) {
      showSnackbar(error, 'error');
    }
  };

  return (
    <Dialog
      sx={{ padding: '8px' }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {dailyBonuses ? 'Редактировать приз' : 'Создать новый приз'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            gap: '24px',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
          }}
        >
          <DatePicker
            value={date}
            onChange={setDate}
            slotProps={{
              textField: { fullWidth: true, error: false, disabled: isLoading },
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '45%',
              '@media (max-width:980px)': {
                maxWidth: '100%',
              },
            }}
            sxLabel={{
              textAlign: 'left',
              width: '100%',
              color: 'var(--primary-text-color)',
              fontSize: '1.125rem',
              fontWeight: '700',
              fontFamily: 'Inter-SemiBold',
            }}
          />
          <FileUploader
            title="Логотип спонсора"
            accept="image/*"
            label="Загрузить логотип"
            sxTitle={{
              textAlign: 'left',
              width: '100%',
              color: 'var(--primary-text-color)',
              fontSize: '1.125rem',
              fontWeight: '700',
              fontFamily: 'Inter-SemiBold',
            }}
            onChange={(files) =>
              handleAddLogo({ file: files, setFile: setLogo, showSnackbar })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
