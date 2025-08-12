import React, { useState, useEffect } from 'react';
import { PrizesTable } from '../PrizesTable/PrizesTable';
import { Prize } from '../../model/types/prizes';

import cls from './Prizes.module.scss';
import { Box, Button, CircularProgress } from '@mui/material';
import { PrizeFormDialog } from '../PrizeFormDialog/PrizeFormDialog';
import { useGetPrizes } from '../../model/lib/hook/useGetPrizes';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { deletePrizeEvent } from '@/features/prizes/model/deletePrize/deletePrize';
import { createPrizeEvent } from '@/features/prizes/model/createPrizeEvent/createPrizeEvent';
import { PrizesUploadModal } from '../PrizesUploadModal/PrizesUploadModal';

export const Prizes = () => {
  const [open, setOpen] = useState(false);
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);
  const [prizesState, setPrizesState] = useState<Prize[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [openAddCode, setOpenAddCode] = useState(false);

  const [prizeAddCodeId, setPrizeAddCodeId] = useState<number>(0);

  const { error, isLoading, prizes, refetch } = useGetPrizes();

  useEffect(() => {
    if (prizes) {
      setPrizesState(prizes);
    }
  }, [prizes]);

  const handleEdit = (prize: Prize) => {
    setEditingPrize(prize);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    setDeleteLoading(true);
    const result = await deletePrizeEvent({
      id,
      setIsLoading: setDeleteLoading,
      setError: setDeleteError,
    });

    if (result) {
      setPrizesState((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddCode = (id: number) => {
    setPrizeAddCodeId(id);
    setOpenAddCode(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPrize(null);
  };

  const handleAddPrize = () => {
    createPrizeEvent({
      setError: setDeleteError,
      setIsLoading: setDeleteLoading,
    });
    refetch();
  };

  if (isLoading || deleteLoading)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error || deleteError) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <Box p={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPrize}
        sx={{ mb: 2 }}
      >
        Добавить приз
      </Button>
      {prizesState.length > 0 && (
        <PrizesTable
          prizes={prizesState}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddCode={handleAddCode}
        />
      )}
      <PrizesUploadModal
        prizeId={prizeAddCodeId}
        open={openAddCode}
        onClose={() => setOpenAddCode(false)}
      />

      <PrizeFormDialog
        open={open}
        onClose={handleClose}
        prize={editingPrize}
        onSave={refetch}
      />
    </Box>
  );
};
