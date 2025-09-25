import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useUpdateTaskMutation } from '../../model/api/task.api';

import type { TasksFormData } from '../../model/types/createTasks';
import { TasksFormUpdate } from '../TasksFormUpdate/TasksFormUpdate';

import { Task } from '../../model/types/tasks';

interface TasksModalUpdateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  task: Task;
  setEditingTask: Dispatch<SetStateAction<Task | null>>;
}

const TasksModalUpdate = (props: TasksModalUpdateProps) => {
  const { open, setOpen, refetch, setEditingTask, task } = props;

  const [onUpdate, { isLoading, error }] = useUpdateTaskMutation();

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<TasksFormData>({
    name: task.name,
    description: task.description,
    picture: '',
    themeId: null,
    api_url: task.api_url,
    link: task.link,
    type: task.type || 'API',
    attempt: task.attempt ?? 1,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('questId', `${task.id}`);
      payload.append('name', formData.name);
      payload.append('description', `${formData.description ?? ''}`);
      payload.append('api_url', String(formData.api_url));
      payload.append('attempt', String(formData.attempt));

      payload.append('link', String(formData.link));
      payload.append('type', String(formData.type));

      if (userInfo) {
        payload.append('user_info', JSON.stringify(userInfo));
      }

      if (logoFile) payload.append('picture', logoFile);

      await onUpdate(payload).unwrap();
      refetch();
      setOpen(false);
      showSnackbar('Приз успешно создан', 'success');

      setFormData({
        name: '',
        description: '',
        picture: '',
        themeId: null,
        api_url: '',
        link: '',
        type: 'API',
        attempt: 1,
      });
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      showSnackbar('Ошибка при создании приза', 'error');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={() => handleSubmitForm()}
      confirmTextButton="Подтвердить"
      headerTitle={`Изменить задачу ${task.name}`}
      disabledFooter={isLoading}
      sxContent={{
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
      }}
      sxHeaderTitle={{ fontSize: '1.2rem' }}
    >
      <div>
        <TasksFormUpdate
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitForm}
          showSnackbar={showSnackbar}
          setLogoFile={setLogoFile}
        />
        {error && <ErrorAlert sx={{ marginTop: '24px' }} />}
      </div>
    </Modal>
  );
};

export { TasksModalUpdate };
