import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Task } from '../../model/types/tasks';
import { Theme } from '@/entities/themes';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface TasksTableProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
  theme: Theme | null;
}

export const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  onEdit,
  onDelete,
  theme,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Тема</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell>Попытки</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>API</TableCell>
            <TableCell>Сылка</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id ?? '-'}</TableCell>
              <TableCell>{theme?.name ?? '-'}</TableCell>
              <TableCell>{task.name ?? '-'}</TableCell>
              <TableCell>{task.description ?? '-'}</TableCell>
              <TableCell>
                <img
                  src={`${imgApi}/${task.picture}`}
                  alt={task.name}
                  width={60}
                />
              </TableCell>
              <TableCell>{task.attempt ?? '-'}</TableCell>
              <TableCell>{task.type ?? '-'}</TableCell>
              <TableCell>{task.api_url ?? '-'}</TableCell>
              <TableCell>{task.link ?? '-'}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit?.(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete?.(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
