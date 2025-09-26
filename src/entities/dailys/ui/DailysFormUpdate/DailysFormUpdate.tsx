import React, { FormEvent, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { handleAddLogo } from '@/shared/lib/handleAddLogo';

import { Input } from '@/shared/ui/Input/Input';

import cls from './DailysFormUpdate.module.scss';
import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';
import { DailyFormData } from '../../model/types/createDailys';
import { ShowSnackbarFn } from '@/shared/types/showSnackbar';

import { Daily } from '../../model/types/dailys';

interface DailysFormUpdateProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  formData: Omit<Daily, 'themeId'>;
  setFormData: Dispatch<SetStateAction<Omit<Daily, 'themeId'>>>;
  setLogoFile: Dispatch<SetStateAction<File | null>>;
  showSnackbar: ShowSnackbarFn;
}

export const DailysFormUpdate: React.FC<DailysFormUpdateProps> = ({
  onSubmit,
  formData,
  setFormData,
  setLogoFile,
  showSnackbar,
}) => {
  const handleChange =
    (field: keyof DailyFormData) =>
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
      className={cls.PrizeFormUpdate}
    >
      <Input
        type="date"
        label="Дата"
        value={formData.date_daily}
        onChange={handleChange('date_daily')}
        InputLabelProps={{ shrink: true }}
        fullWidth
        placeholder="Укажите дату"
      />

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
