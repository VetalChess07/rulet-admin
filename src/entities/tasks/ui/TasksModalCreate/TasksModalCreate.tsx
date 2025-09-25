import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useCreateTaskMutation } from '../../model/api/task.api';

import type { TasksFormData } from '../../model/types/createTasks';

import { TasksFormCreate } from '../TasksFormCreate/TasksFormCreate';

interface TasksModalCreateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  themeId: number;
}

const TasksModalCreate = (props: TasksModalCreateProps) => {
  const { open, setOpen, refetch, themeId } = props;

  const [pnCreate, { isLoading, error }] = useCreateTaskMutation();

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<TasksFormData>({
    name: '',
    description: '',
    picture: '',
    themeId: themeId,
    api_url: '',
    link: '',
    type: 'API',
    attempt: 1,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('themeId', `${themeId}`);
      payload.append('name', formData.name);
      payload.append('description', `${formData.description ?? ''}`);
      payload.append('api_url', String(formData.api_url));
      payload.append('attempt', String(formData.attempt));

      payload.append('link', String(formData.link));
      payload.append('type', String(formData.type));

      if (formData.type === 'PARTNER') {
        payload.append('api_url', 'quests-users/check_partner_quest');
      }

      if (userInfo) {
        payload.append('user_info', JSON.stringify(userInfo));
      }

      if (logoFile) payload.append('picture', logoFile);

      await pnCreate(payload).unwrap();
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
      headerTitle={`Создать задания`}
      disabledFooter={isLoading}
      sxContent={{
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
      }}
      sxHeaderTitle={{ fontSize: '1.2rem' }}
    >
      <div>
        <TasksFormCreate
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

export { TasksModalCreate };
