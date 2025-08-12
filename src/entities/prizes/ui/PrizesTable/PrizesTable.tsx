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

import { Prize } from '../../model/types/prizes';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface PrizesTableProps {
  prizes: Prize[];
  onDelete?: (id: number) => void;
  onEdit?: (prize: Prize) => void;
  onAddCode?: (id: number) => void;
}

export const PrizesTable: React.FC<PrizesTableProps> = ({
  prizes,
  onEdit,
  onDelete,
  onAddCode,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="prizes table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>Процент %</TableCell>
            <TableCell>createdAt</TableCell>
            <TableCell>updatedAt</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prizes.map((prize) => (
            <TableRow key={prize.id}>
              <TableCell>{prize.id}</TableCell>
              <TableCell>{prize.name}</TableCell>
              <TableCell>
                <img
                  src={`${imgApi}/${prize.picture}`}
                  alt={prize.name}
                  width={60}
                />
              </TableCell>
              <TableCell>{prize.description}</TableCell>
              <TableCell>{prize.type || '-'}</TableCell>
              <TableCell>{prize.procent}</TableCell>
              <TableCell>{prize.createdAt}</TableCell>
              <TableCell>{prize.updatedAt}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit?.(prize)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete?.(prize.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onAddCode?.(prize.id)}>
                  ADD CODE
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
