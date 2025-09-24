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
import { useCreatePrizeValuesMutation } from '../../model/api/prize.api';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';

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
  const [codes, setCodes] = useState('');
  const [uploadPrizesValues, { isLoading, error, isSuccess }] =
    useCreatePrizeValuesMutation();

  const handleSubmit = async () => {
    const array = codes
      .split(',')
      .map((code) => code.trim())
      .filter(Boolean);

    if (array.length === 0) {
      alert('Введите хотя бы один код.');
      return;
    }

    try {
      await uploadPrizesValues({ prizeId, values: codes }).unwrap();
      alert('Призы успешно загружены');
      setCodes('');
      onClose();
    } catch (e) {
      console.error('Ошибка при загрузке призов:', e);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      confirmTextButton="Отправить"
      headerTitle="Загрузка призов"
      disabledFooter={isLoading}
      sxContent={{ padding: '24px', maxWidth: '600px', width: '100%' }}
      sxHeaderTitle={{ fontSize: '1.2rem' }}
    >
      <>
        <Input
          label="Коды призов"
          multiline
          rows={6}
          placeholder="Введите коды через запятую, например: ABC123,DEF456,GHI789"
          value={codes}
          onChange={(e) => setCodes(e.target.value)}
          disabled={isLoading}
          fullWidth
        />

        {error && (
          <Typography variant="body2" color="error">
            {(error as any)?.data?.message || 'Произошла ошибка при загрузке'}
          </Typography>
        )}

        {isSuccess && (
          <Typography variant="body2" color="success.main">
            Призы успешно загружены!
          </Typography>
        )}
      </>
    </Modal>
  );
};
