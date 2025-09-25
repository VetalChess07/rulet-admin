import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { TasksTable } from '../TasksTable/TasksTable';

import { useGetAllTasksByThemeIdQuery } from '../../model/api/task.api';
import type { Task } from '../../model/types/tasks';
import { getCurrentTheme } from '@/entities/themes/model/selectors/theme.selectors';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';

import { TasksHeader } from '../TasksHeader/TasksHeader';
import { TasksModalCreate } from '../TasksModalCreate/TasksModalCreate';

import { TasksModalUpdate } from '../TasksModalUpdate/TasksModalUpdate';
import { TasksModalApproveDelete } from '../TasksModalApproveDelete/TasksModalApproveDelete';

export const Tasks: React.FC = () => {
  const theme = useAppSelector(getCurrentTheme);

  const { data, isLoading, error, refetch } = useGetAllTasksByThemeIdQuery(
    { themeId: theme?.id ?? 1 },
    { skip: !theme },
  );

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEidt] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editingPrize, setEditingPrize] = useState<Task | null>(null);

  const handleAddTask = () => {
    setOpenModal(true);
  };
  const handlOpenEditModal = (prize: Task) => {
    setOpenModalEidt(true);
    setEditingPrize(prize);
  };

  const handleDelete = (prizeId: number) => {
    setOpenModalDelete(true);
    setDeleteId(prizeId);
  };

  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <Box p={2}>
      <TasksHeader handleAddPTask={handleAddTask} />

      {data?.data && (
        <TasksTable
          tasks={data.data}
          onEdit={handlOpenEditModal}
          onDelete={handleDelete}
        />
      )}

      {theme && (
        <TasksModalCreate
          themeId={theme.id}
          open={openModal}
          refetch={refetch}
          setOpen={setOpenModal}
        />
      )}
      {editingPrize && (
        <TasksModalUpdate
          task={editingPrize}
          open={openModalEdit}
          refetch={refetch}
          setOpen={setOpenModalEidt}
          setEditingTask={setEditingPrize}
        />
      )}
      {deleteId && (
        <TasksModalApproveDelete
          setOpen={setOpenModalDelete}
          open={openModalDelete}
          refetch={refetch}
          deleteId={deleteId}
        />
      )}
    </Box>
  );
};
