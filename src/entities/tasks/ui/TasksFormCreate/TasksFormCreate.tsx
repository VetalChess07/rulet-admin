import React, { FormEvent, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { handleAddLogo } from '@/shared/lib/handleAddLogo';

import { Input } from '@/shared/ui/Input/Input';

import cls from './TasksFormCreate.module.scss';
import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';
import { TasksFormData } from '../../model/types/createTasks';
import { ShowSnackbarFn } from '@/shared/types/showSnackbar';
import { SelectTaskType } from '../SelectTaskType/SelectTaskType';

interface TasksFormCreateProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  formData: TasksFormData;
  setFormData: Dispatch<SetStateAction<TasksFormData>>;
  setLogoFile: Dispatch<SetStateAction<File | null>>;
  showSnackbar: ShowSnackbarFn;
}

export const TasksFormCreate: React.FC<TasksFormCreateProps> = ({
  onSubmit,
  formData,
  setFormData,
  setLogoFile,
  showSnackbar,
}) => {
  const handleChange =
    (field: keyof TasksFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      className={cls.TasksFormCreate}
    >
      <Input
        label="Заголовок задания"
        value={formData.name}
        onChange={handleChange('name')}
        fullWidth
        placeholder="Введите заголовок"
      />

      <Input
        label="Описание приза"
        value={formData.description}
        onChange={handleChange('description')}
        fullWidth
        placeholder="Введите описание приза"
      />

      <Input
        label="Кол-во попыток за выполнение"
        value={formData.attempt}
        onChange={handleChange('attempt')}
        fullWidth
        type={'number'}
        placeholder="Укажите кол-во попыток за выполнение"
      />

      <SelectTaskType setFormData={setFormData} value={formData.type} />

      {formData.type !== 'PARTNER' && (
        <Input
          label="Ссылка на api которое будет это исполнять в таком формате 'quests-users/check_partner_quest'"
          value={formData.api_url}
          onChange={handleChange('api_url')}
          fullWidth
          placeholder="quests-users/check_partner_quest"
        />
      )}
      {formData.type !== 'PARTNER' && (
        <Input
          label="Ссылка для перехода на контент в формате https://domen.com"
          value={formData.link}
          onChange={handleChange('link')}
          fullWidth
          placeholder="Укажите ссылку"
        />
      )}

      <FileUploader
        title="Логотип"
        accept="image/*"
        label="Загрузить логотип"
        sxTitle={{ textAlign: 'left', width: '100%', fontWeight: 700 }}
        onChange={(files) =>
          handleAddLogo({ file: files, setFile: setLogoFile, showSnackbar })
        }
      />
    </form>
  );
};
