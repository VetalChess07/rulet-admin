// features/tasks/ui/TaskDialog/TaskDialog.tsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';
import { handleAddLogo } from '@/shared/lib/handleAddLogo';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { Task } from '../../model/types/tasks';
import { updateTask } from '@/features/tasks/model/updateTask/updateTask';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: () => void;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onClose,
  task,
  onSave,
}) => {
  const [id, setId] = useState<number | null>(task?.id ?? null);
  const [name, setName] = useState(task?.name ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [attempt, setAttempt] = useState(task?.attempt ?? 0);
  const [api, setApi] = useState(task?.api ?? '');
  const [type, setType] = useState(task?.type ?? '');
  const [params, setParams] = useState(task?.params ?? '');
  const [logo, setLogo] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setId(task?.id ?? null);
    setName(task?.name ?? '');
    setDescription(task?.description ?? '');
    setAttempt(task?.attempt ?? 0);
    setApi(task?.api ?? '');
    setType(task?.type ?? '');
    setParams(task?.params ?? '');
    setLogo(null);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert('ID задачи не указан');
      return;
    }

    setError(null);

    const res = await updateTask({
      id,
      name,
      description,
      attempt,
      api,
      type,
      params,
      picture_file: logo,
      setIsLoading,
      setError,
    });

    if (res) {
      showSnackbar('Задача успешно обновлена', 'success');
      onSave();
      onClose();
    } else if (error) {
      showSnackbar(error, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {task ? 'Редактировать задачу' : 'Создать новую задачу'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            gap: '24px',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
          }}
        >
          <TextField
            label="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            fullWidth
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Попытки"
            type="number"
            value={attempt}
            onChange={(e) => setAttempt(Number(e.target.value))}
            disabled={isLoading}
            fullWidth
          />
          <TextField
            label="API"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            disabled={isLoading}
            fullWidth
          />
          <TextField
            label="Тип"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isLoading}
            fullWidth
          />
          <TextField
            label="Параметры"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            disabled={isLoading}
            fullWidth
          />
          <FileUploader
            title="Логотип"
            accept="image/*"
            label="Загрузить изображение"
            sxTitle={{
              textAlign: 'left',
              width: '100%',
              color: 'var(--primary-text-color)',
              fontSize: '1.125rem',
              fontWeight: '700',
              fontFamily: 'Inter-SemiBold',
            }}
            onChange={(files) =>
              handleAddLogo({ file: files, setFile: setLogo, showSnackbar })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
