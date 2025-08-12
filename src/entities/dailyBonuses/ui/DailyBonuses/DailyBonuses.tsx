import { useState, useEffect } from 'react';
import { DailyBonusesTable } from '../DailyBonusesTable/DailyBonusesTable';
import { DailyBonuses as DailyBonusesTypes } from '../../model/types/dailyBonuses';

import { Box, Button, CircularProgress } from '@mui/material';
import { DailyBonusesDialog } from '../DailyBonusesDialog/DailyBonusesDialog';
import { useGetAllEvents } from '../../model/lib/hook/useGetAllEvents';

import cls from './DailyBonuses.module.scss';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { deleteDailyBonuses } from '@/features/dailyBonuses';
import { createDailyBonusEvent } from '@/features/dailyBonuses/model/service/createDailyBonusEvent/createDailyBonusEvent';

export const DailyBonuses = () => {
  const [open, setOpen] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [editingDailyBonuses, setEditingDailyBonuses] =
    useState<DailyBonusesTypes | null>(null);
  const [eventsState, setEventsState] = useState<DailyBonusesTypes[]>([]);

  const { allEvents, error, isLoading, refetch } = useGetAllEvents();

  useEffect(() => {
    if (allEvents) {
      setEventsState(allEvents);
    }
  }, [allEvents]);

  const handleEdit = (dailyBonuses: DailyBonusesTypes) => {
    setEditingDailyBonuses(dailyBonuses);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteDailyBonuses({
      setError: setErrorState,
      setIsLoading: setIsLoadingState,
      id,
    });
    await refetch();
  };

  const addNewDailiyBonus = async () => {
    await createDailyBonusEvent({
      setError: setErrorState,
      setIsLoading: setIsLoadingState,
    });
    await refetch();
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDailyBonuses(null);
  };

  const handleSave = () => {
    refetch();
  };

  if (isLoading || isLoadingState)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <Box p={2}>
      {errorState && (
        <ErrorAlert message={errorState} sx={{ marginTop: '24px' }} />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={addNewDailiyBonus}
        sx={{ mb: 2 }}
      >
        Добавить приз
      </Button>
      {eventsState.length > 0 && (
        <DailyBonusesTable
          allEvents={eventsState}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <DailyBonusesDialog
        open={open}
        onClose={handleClose}
        dailyBonuses={editingDailyBonuses}
        onSave={handleSave}
      />
    </Box>
  );
};
