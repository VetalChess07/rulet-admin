import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { uploadPrizesValues } from '@/features/prizes/model/uploadPrizesValues/uploadPrizesValues';

interface PrizesUploadModalProps {
  open: boolean;
  onClose: () => void;
  prizeId: number;
}

export const PrizesUploadModal: React.FC<PrizesUploadModalProps> = ({
  open,
  onClose,
  prizeId,
}) => {
  const [filePrizes, setFilePrizes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      setFilePrizes(lines);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setError(null);

    const res = await uploadPrizesValues({
      array: filePrizes,
      prizeId,
      setIsLoading,
      setError,
    });

    if (res) {
      alert('Призы успешно загружены');

      setFilePrizes([]);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Загрузка призов</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="outlined" component="label" disabled={isLoading}>
          Загрузить файл с призами (.txt)
          <input type="file" hidden accept=".txt" onChange={handleFileChange} />
        </Button>
        {filePrizes.length > 0 && (
          <Typography variant="body2" color="textSecondary">
            Загружено из файла: {filePrizes.length} призов
          </Typography>
        )}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Отправить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
