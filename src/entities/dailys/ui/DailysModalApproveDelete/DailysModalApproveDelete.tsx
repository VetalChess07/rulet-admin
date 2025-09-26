import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useDeleteDailyMutation } from '../../model/api/daily.api';

import { Typography } from '@mui/material';

interface DailysModalApproveDeleteProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deleteId: number;
}

const DailysModalApproveDelete = (props: DailysModalApproveDeleteProps) => {
  const { open, setOpen, refetch, deleteId } = props;

  const [onDelete, { isLoading, error }] = useDeleteDailyMutation();

  const { showSnackbar } = useSnackbar();

  const handleSubmitForm = async () => {
    try {
      await onDelete({ dailyId: deleteId }).unwrap();
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
      headerTitle={`Удалить ежедненове задание с id ${deleteId}`}
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

export { DailysModalApproveDelete };
