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

import { DailyBonuses } from '../../model/types/dailyBonuses';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface DailyBonusesTableProps {
  allEvents: DailyBonuses[];
  onDelete?: (id: number) => void;
  onEdit?: (prize: DailyBonuses) => void;
}

export const DailyBonusesTable: React.FC<DailyBonusesTableProps> = ({
  allEvents,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="daily bonuses table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>

            <TableCell>Дата создания</TableCell>
            <TableCell>Дата улучшения</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Картинка</TableCell>

            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allEvents.map((prize) => (
            <TableRow key={prize.id}>
              <TableCell>{prize.id}</TableCell>
              <TableCell>{prize.createdAt}</TableCell>
              <TableCell>{prize.updatedAt}</TableCell>
              <TableCell>{prize.date_event}</TableCell>
              <TableCell>
                <img
                  src={`${imgApi}/${prize.picture}`}
                  alt={prize.date_event}
                  width={60}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit?.(prize)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete?.(prize.id)}>
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
