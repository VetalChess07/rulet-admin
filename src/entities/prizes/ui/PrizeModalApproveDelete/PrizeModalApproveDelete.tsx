import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import {
  useDeletePrizeMutation,
  useUpdatePrizeMutation,
} from '../../model/api/prize.api';

import type { PrizeFormData } from '../../model/types/createPrize';
import { PrizeFormCreate } from '../PrizeFormCreate/PrizeFormCreate';

import { Prize } from '../../model/types/prizes';
import { Typography } from '@mui/material';

interface PrizeModalApproveDeleteProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deleteId: number;
}

const PrizeModalApproveDelete = (props: PrizeModalApproveDeleteProps) => {
  const { open, setOpen, refetch, deleteId } = props;

  const [onDelete, { isLoading, error }] = useDeletePrizeMutation();

  const { showSnackbar } = useSnackbar();

  const handleSubmitForm = async () => {
    try {
      await onDelete({ prizeId: deleteId }).unwrap();
      refetch();
      setOpen(false);
    } catch (error) {
      console.error(error);
      showSnackbar('Ошибка при создании приза', 'error');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={() => handleSubmitForm()}
      confirmTextButton="Подтвердить"
      headerTitle={`Изменить приз с id ${deleteId}`}
      disabledFooter={isLoading}
      sxContent={{
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
      }}
      sxHeaderTitle={{ fontSize: '1.2rem' }}
    >
      <>
        {error && <ErrorAlert />}
        <Typography variant="body1">Вы уверены что хотите удалить ?</Typography>
      </>
    </Modal>
  );
};

export { PrizeModalApproveDelete };
