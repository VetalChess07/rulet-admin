import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { Prize } from '../../model/types/prizes';

import { updatePrizeEvent } from '@/features/prizes/model/updatePrize/updatePrize';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

interface PrizeFormDialogProps {
  open: boolean;
  onClose: () => void;
  prize: Prize | null;
  onSave: () => void; // коллбэк для обновления списка в родителе
}

export const PrizeFormDialog: React.FC<PrizeFormDialogProps> = ({
  open,
  onClose,
  prize,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState(''); // "1" или ""
  const [procent, setProcent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prize) {
      setName(prize.name || '');
      setDescription(prize.description || '');
      setType(prize.type || '');
      setProcent(prize.procent || 0);
      setPicture(null); // при редактировании новая картинка не обязательна
    } else {
      setName('');
      setDescription('');
      setType('');
      setProcent(0);
      setPicture(null);
    }
  }, [prize]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPicture(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Введите название приза');
      return;
    }

    if (prize) {
      // Редактирование
      const res = await updatePrizeEvent({
        id: prize.id,
        name,
        description,
        type,
        procent,
        picture,
        setIsLoading,
        setError,
      });
      if (res) {
        onSave();
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {prize ? 'Редактировать приз' : 'Создать новый приз'}
      </DialogTitle>
      <DialogContent>
        {error && <ErrorAlert sx={{ mb: 2 }} message={error} />}
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Название приза"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <Button variant="outlined" component="label">
            Загрузить картинку
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Тип (оставьте пустым или 1)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          />
          <TextField
            label="Процент выпадения"
            type="number"
            value={procent}
            onChange={(e) => setProcent(parseFloat(e.target.value))}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: '#fff' }} />
          ) : (
            'Сохранить'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
