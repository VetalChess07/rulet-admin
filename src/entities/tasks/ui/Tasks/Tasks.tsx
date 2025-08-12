import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

import { Task } from '../../model/types/tasks';
import { TasksTable } from '../TasksTable/TasksTable';
import { TaskDialog } from '../TaskDialog/TaskDialog';
import { useGetTask } from '../../model/lib/hook/useGetTask';
// import { createTaskEvent } from '../../model/api/createTaskEvent';
// import { updateTaskEvent } from '../../model/api/updateTaskEvent';
import { deleteTask } from '@/features/tasks/model/deleteTask/deleteTask';
import { createTasks } from '@/features/tasks/model/createTasks/createTasks';

export const Tasks: React.FC = () => {
  const { error, isLoading, refetch, tasks } = useGetTask();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorState, setErrorState] = useState<string | null>('');

  const [loadingState, setLoadingState] = useState(false);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteTask({
      id,
      setIsLoading: setIsSaving,
      setError: setErrorState,
    });
    refetch();
  };

  const handleAddTasks = () => {
    createTasks({
      setError: setErrorState,
      setIsLoading: setLoadingState,
    });
    refetch();
  };

  if (isLoading || loadingState)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (error) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <div>
      {errorState && (
        <ErrorAlert message={errorState} sx={{ marginTop: '24px' }} />
      )}
      <Button
        sx={{ marginBottom: '20px' }}
        onClick={handleAddTasks}
        disabled={isSaving}
      >
        Добавить задачу
      </Button>

      {tasks && (
        <TasksTable
          // @ts-ignore
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        task={selectedTask}
        onSave={refetch}
      />
    </div>
  );
};
