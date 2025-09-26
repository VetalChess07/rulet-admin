import React, { FormEvent, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { handleAddLogo } from '@/shared/lib/handleAddLogo';

import { Input } from '@/shared/ui/Input/Input';

import cls from './PrizeFormCreate.module.scss';
import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';
import { PrizeFormData } from '../../model/types/createPrize';
import { ShowSnackbarFn } from '@/shared/types/showSnackbar';
import { SelectPrizeType } from '../SelectPrizeType/SelectPrizeType';

interface PrizeFormCreateProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  formData: PrizeFormData;
  setFormData: Dispatch<SetStateAction<PrizeFormData>>;
  setLogoFile: Dispatch<SetStateAction<File | null>>;
  showSnackbar: ShowSnackbarFn;
}

export const PrizeFormCreate: React.FC<PrizeFormCreateProps> = ({
  onSubmit,
  formData,
  setFormData,
  setLogoFile,
  showSnackbar,
}) => {
  const handleChange =
    (field: keyof PrizeFormData) =>
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
      className={cls.CreateThemeForm}
    >
      <Input
        label="Заголовок приза"
        value={formData.name}
        onChange={handleChange('name')}
        fullWidth
        placeholder="Введите Заголовок"
      />

      <Input
        label="Описание приза"
        value={formData.description}
        onChange={handleChange('description')}
        fullWidth
        placeholder="Введите описание приза"
      />

      <Input
        label="Процент выпадения"
        value={formData.procent}
        onChange={handleChange('procent')}
        fullWidth
        type="number"
        placeholder="Процент %"
        inputProps={{ max: 100, min: 0 }}
      />

      <SelectPrizeType setFormData={setFormData} value={formData.type} />

      {formData.type === 'attempt' && (
        <Input
          label="Кол-во попыток за награду"
          value={formData.attempt}
          onChange={handleChange('attempt')}
          fullWidth
          type="number"
          placeholder="Процент %"
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
