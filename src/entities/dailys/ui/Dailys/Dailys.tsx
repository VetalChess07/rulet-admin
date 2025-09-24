import { useState } from 'react';
import { DailysTable } from '../DailysTable/DailysTable';
import { Daily } from '../../model/types/dailys';

import cls from './Dailys.module.scss';
import { Box, CircularProgress } from '@mui/material';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

import { DailysUploadModal } from '../DailysUploadModal/DailysUploadModal';
import { useGetAllDailysByThemeIdQuery } from '../../model/api/daily.api';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getCurrentTheme } from '@/entities/themes/model/selectors/theme.selectors';
import { DailyModalCreate } from '../DailyModalCreate/DailyModalCreate';
import { DailysHeader } from '../DailysHeader/DailysHeader';
import { DailyModalUpdate } from '../DailyModalUpdate/DailyModalUpdate';
import { DailysModalApproveDelete } from '../DailysModalApproveDelete/DailysModalApproveDelete';

export const Dailys = () => {
  const theme = useAppSelector(getCurrentTheme);

  const { data, isLoading, isError, error, refetch } =
    useGetAllDailysByThemeIdQuery(
      { themeId: theme?.id ?? 1 },
      { skip: !theme },
    );

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEidt] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAddCode, setOpenModalAddCode] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editingPrize, setEditingPrize] = useState<Daily | null>(null);

  const [prizeAddCodeId, setPrizeAddCodeId] = useState<number>(0);

  const handleAddPrize = () => {
    setOpenModal(true);
  };
  const handlOpenEditModal = (prize: Daily) => {
    setOpenModalEidt(true);
    setEditingPrize(prize);
  };

  const handleDelete = (prizeId: number) => {
    setOpenModalDelete(true);
    setDeleteId(prizeId);
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
      <DailysHeader handleAddPrize={handleAddPrize} />
      {data?.data && (
        <DailysTable
          prizes={data.data}
          onEdit={handlOpenEditModal}
          onDelete={handleDelete}
        />
      )}

      <DailyModalCreate
        theme={theme}
        open={openModal}
        refetch={refetch}
        setOpen={setOpenModal}
      />
      {editingPrize && (
        <DailyModalUpdate
          daily={editingPrize}
          open={openModalEdit}
          refetch={refetch}
          setOpen={setOpenModalEidt}
          setEditingPrize={setEditingPrize}
        />
      )}
      {deleteId && (
        <DailysModalApproveDelete
          setOpen={setOpenModalDelete}
          open={openModalDelete}
          refetch={refetch}
          deleteId={deleteId}
        />
      )}
    </Box>
  );
};
