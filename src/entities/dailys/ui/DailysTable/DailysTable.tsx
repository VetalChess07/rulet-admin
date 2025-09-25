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

import { Daily } from '../../model/types/dailys';
import dayjs from 'dayjs';
import { Theme } from '@/entities/themes';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface DailysTableProps {
  prizes: Daily[];
  onDelete?: (id: number) => void;
  onEdit?: (prize: Daily) => void;
  theme: Theme | null;
}

export const DailysTable: React.FC<DailysTableProps> = ({
  prizes,
  onEdit,
  onDelete,
  theme,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="prizes table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Тема</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell>Дата провередения</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prizes.map((prize) => (
            <TableRow key={prize.id}>
              <TableCell>{prize.id}</TableCell>
              <TableCell>{theme?.name}</TableCell>
              <TableCell>
                <img
                  src={`${imgApi}/${prize.picture}`}
                  alt={`${prize.date_daily ?? ''}`}
                  width={60}
                />
              </TableCell>
              <TableCell>
                {prize.date_daily
                  ? dayjs(prize.date_daily).format('DD.MM.YYYY')
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
