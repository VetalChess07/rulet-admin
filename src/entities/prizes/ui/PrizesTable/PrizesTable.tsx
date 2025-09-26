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
import { ImBoxAdd } from 'react-icons/im';

import { Prize } from '../../model/types/prizes';
import dayjs from 'dayjs';
import { Theme } from '@/entities/themes';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface PrizesTableProps {
  prizes: Prize[];
  onDelete?: (id: number) => void;
  onEdit?: (prize: Prize) => void;
  onAddCode?: (id: number) => void;
  theme: Theme | null;
}

export const PrizesTable: React.FC<PrizesTableProps> = ({
  prizes,
  onEdit,
  onDelete,
  onAddCode,
  theme,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="prizes table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Тема</TableCell>
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
              <TableCell>{theme?.name}</TableCell>
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
              <TableCell>
                {prize.created_at
                  ? dayjs(prize.created_at).format('DD.MM.YYYY')
                  : '-'}
              </TableCell>
              <TableCell>
                {prize.updated_at
                  ? dayjs(prize.updated_at).format('DD.MM.YYYY')
                  : '-'}
              </TableCell>
              <TableCell align="right">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <IconButton color="primary" onClick={() => onEdit?.(prize)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete?.(prize.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => onAddCode?.(prize.id)}>
                    <ImBoxAdd />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
