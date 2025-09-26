import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  userInfo: object; // сюда передаем объект из телеграм-виджета
}

export const DailysUploadDialog: React.FC<Props> = ({
  open,
  onClose,
  userInfo,
}) => {
  const [fileContent, setFileContent] = useState<string[]>([]);
  const [prizeId, setPrizeId] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      // разделяем по строкам и фильтруем пустые
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      setFileContent(lines);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!prizeId) {
      setError('Укажите ID приза');
      return;
    }
    if (fileContent.length === 0) {
      setError('Выберите файл с призами');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://promo.donatov.net/api_field_of_luck/prizes_values/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            array: fileContent,
            prizeId,
            user_info: JSON.stringify(userInfo),
          }),
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.message || 'Ошибка сервера');
      } else {
        alert('Призы успешно загружены!');
        onClose();
      }
    } catch (e) {
      setError('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Загрузка призов</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <TextField
          label="ID приза"
          type="number"
          value={prizeId}
          onChange={(e) => setPrizeId(Number(e.target.value))}
          disabled={isLoading}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Загрузить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
