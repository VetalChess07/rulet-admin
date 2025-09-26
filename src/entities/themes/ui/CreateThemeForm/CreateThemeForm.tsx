import { ChangeEvent, FormEvent, SetStateAction, Dispatch } from 'react';
import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Input } from '@/shared/ui/Input/Input';
import { handleAddLogo } from '@/shared/lib/handleAddLogo';

import { TypeThemeGame } from '../../model/types/theme.types';
import { ThemeFormData } from '../../model/types/createTheme';
import { ShowSnackbarFn } from '@/shared/types/showSnackbar';

import cls from './CreateThemeForm.module.scss';
import { TypeThemeGameRu } from '../../model/conts/objKeys';

interface CreateThemeFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  refetch: () => void;
  formData: ThemeFormData;
  setFormData: Dispatch<SetStateAction<ThemeFormData>>;

  setLogoFile: Dispatch<SetStateAction<File | null>>;
  setBannerFile: Dispatch<SetStateAction<File | null>>;
  setBannerMobileFile: Dispatch<SetStateAction<File | null>>;
  showSnackbar: ShowSnackbarFn;
}

export const CreateThemeForm = ({
  onSubmit,
  formData,
  setFormData,
  setBannerFile,
  setBannerMobileFile,
  setLogoFile,
  showSnackbar,
}: CreateThemeFormProps) => {
  const handleChange =
    (field: keyof ThemeFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleCheckboxChange =
    (field: keyof ThemeFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.checked,
      }));
    };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      type_themes: e.target.value as TypeThemeGame,
    }));
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      className={cls.CreateThemeForm}
    >
      <Input
        label="Название"
        value={formData.name}
        onChange={handleChange('name')}
        required
        fullWidth
        placeholder="Введите название"
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

      <FileUploader
        title="Баннер"
        accept="image/*"
        label="Загрузить баннер"
        sxTitle={{ textAlign: 'left', width: '100%', fontWeight: 700 }}
        onChange={(files) =>
          handleAddLogo({ file: files, setFile: setBannerFile, showSnackbar })
        }
      />

      <FileUploader
        title="Мобильный баннер"
        accept="image/*"
        label="Загрузить мобильный баннер"
        sxTitle={{ textAlign: 'left', width: '100%', fontWeight: 700 }}
        onChange={(files) =>
          handleAddLogo({
            file: files,
            setFile: setBannerMobileFile,
            showSnackbar,
          })
        }
      />

      <Input
        label="Заголовок"
        value={formData.title}
        onChange={handleChange('title')}
        fullWidth
        placeholder="Введите заголовок"
      />

      <Input
        label="Описание"
        value={formData.description}
        onChange={handleChange('description')}
        fullWidth
        placeholder="Введите описание"
      />

      <Input
        type="date"
        label="Дата старта"
        value={formData.themes_start_date}
        onChange={handleChange('themes_start_date')}
        InputLabelProps={{ shrink: true }}
        fullWidth
        placeholder="Выберите дату старта"
      />

      <Input
        type="date"
        label="Дата окончания"
        value={formData.themes_finish_date}
        onChange={handleChange('themes_finish_date')}
        InputLabelProps={{ shrink: true }}
        fullWidth
        placeholder="Выберите дату окончания"
      />

      <Input
        label="Token TG Bot"
        value={formData.token_tg_bot}
        onChange={handleChange('token_tg_bot')}
        fullWidth
        placeholder="Введите токен"
      />

      <InputLabel>Тип игры</InputLabel>
      <Select
        sx={{ padding: '12px 0px 12px 8px' }}
        value={formData.type_themes}
        onChange={handleSelectChange}
      >
        {Object.values(TypeThemeGame).map((type) => (
          <MenuItem key={type} value={type}>
            {TypeThemeGameRu[type]}
          </MenuItem>
        ))}
      </Select>

      <Input
        label="URL игры"
        value={formData.url_game}
        onChange={handleChange('url_game')}
        fullWidth
        placeholder="Введите ссылку на игру"
      />

      <label htmlFor="isStart">
        <Checkbox
          id="isStart"
          title="Сразу начать событие"
          checked={formData.start ?? false}
          onChange={handleCheckboxChange('start')}
        />
      </label>
    </form>
  );
};
