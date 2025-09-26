import React, { useState, useEffect } from 'react';
import { PrizesTable } from '../PrizesTable/PrizesTable';
import { Prize } from '../../model/types/prizes';

import cls from './Prizes.module.scss';
import { Box, Button, CircularProgress } from '@mui/material';
import { PrizeFormCreate } from '../PrizeFormCreate/PrizeFormCreate';
import { useGetPrizes } from '../../model/lib/hook/useGetPrizes';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { deletePrizeEvent } from '@/features/prizes/model/deletePrize/deletePrize';
import { createPrizeEvent } from '@/features/prizes/model/createPrizeEvent/createPrizeEvent';
import { PrizesUploadModal } from '../PrizesUploadModal/PrizesUploadModal';
import { useGetAllPrizesByThemeIdQuery } from '../../model/api/prize.api';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import {
  getCurrentTheme,
  getCurrentThemeId,
} from '@/entities/themes/model/selectors/theme.selectors';
import { PrizeModalCreate } from '../PrizeModalCreate/PrizeModalCreate';
import { PrizeHeader } from '../PrizeHeader/PrizeHeader';
import { PrizeModalUpdate } from '../PrizeModalUpdate/PrizeModalUpdate';
import { PrizeModalApproveDelete } from '../PrizeModalApproveDelete/PrizeModalApproveDelete';

export const Prizes = () => {
  const theme = useAppSelector(getCurrentTheme);

  const { data, isLoading, isError, error, refetch } =
    useGetAllPrizesByThemeIdQuery(
      { themeId: theme?.id ?? 1 },
      { skip: !theme },
    );

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEidt] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAddCode, setOpenModalAddCode] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);

  const [prizeAddCodeId, setPrizeAddCodeId] = useState<number>(0);

  const handleAddPrize = () => {
    setOpenModal(true);
  };
  const handlOpenEditModal = (prize: Prize) => {
    setOpenModalEidt(true);
    setEditingPrize(prize);
  };

  const handleDelete = (prizeId: number) => {
    setOpenModalDelete(true);
    setDeleteId(prizeId);
  };
  const handleAddCode = (prizeId: number) => {
    setOpenModalAddCode(true);
    setPrizeAddCodeId(prizeId);
  };

  if (isLoading)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (!theme) return null;

  if (error || isError || !Array.isArray(data?.data))
    return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <Box p={2}>
      <PrizeHeader handleAddPrize={handleAddPrize} />
      {data?.data && (
        <PrizesTable
          theme={theme}
          prizes={data.data}
          onEdit={handlOpenEditModal}
          onDelete={handleDelete}
          onAddCode={handleAddCode}
        />
      )}
      <PrizesUploadModal
        prizeId={prizeAddCodeId}
        open={openModalAddCode}
        onClose={() => setOpenModalAddCode(false)}
      />

      <PrizeModalCreate
        theme={theme}
        open={openModal}
        refetch={refetch}
        setOpen={setOpenModal}
      />
      {editingPrize && (
        <PrizeModalUpdate
          prize={editingPrize}
          open={openModalEdit}
          refetch={refetch}
          setOpen={setOpenModalEidt}
          setEditingPrize={setEditingPrize}
        />
      )}
      {deleteId && (
        <PrizeModalApproveDelete
          setOpen={setOpenModalDelete}
          open={openModalDelete}
          refetch={refetch}
          deleteId={deleteId}
        />
      )}
    </Box>
  );
};
