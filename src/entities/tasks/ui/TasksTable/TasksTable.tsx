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

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface TasksTableProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
}

export const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Попытки</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>API</TableCell>
            <TableCell>Параметры</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>
                <img
                  src={`${imgApi}/${task.picture}`}
                  alt={task.name}
                  width={60}
                />
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.attempt}</TableCell>
              <TableCell>{task.type}</TableCell>
              <TableCell>{task.api}</TableCell>
              <TableCell>{task.params}</TableCell>
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
