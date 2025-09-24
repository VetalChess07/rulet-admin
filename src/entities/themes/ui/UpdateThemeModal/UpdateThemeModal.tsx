import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { ThemeFormData } from '../../model/types/createTheme';
import { Theme, TypeThemeGame } from '../../model/types/theme.types';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { useUpdateThemeMutation } from '../../model/api/theme.api';
import { formatDate } from '@/shared/lib/formatDate';
import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { UpdateThemeForm } from '../UpdateThemeForm/UpdateThemeForm';

interface UpdateThemeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  theme: Theme;
}

const UpdateThemeModal = (props: UpdateThemeModalProps) => {
  const { open, setOpen, refetch, theme } = props;

  const [onUpdate, { isLoading, error }] = useUpdateThemeMutation();

  const { showSnackbar } = useSnackbar();

  console.log(theme);

  const [formData, setFormData] = useState<ThemeFormData>({
    name: theme.name ?? '',
    logo: theme.logo ?? '',
    banner: '',
    bannerMobile: '',
    title: theme.title ?? '',
    description: theme.description ?? '',
    start: theme.start,
    themes_start_date: theme.themes_start_date ?? new Date(),
    themes_finish_date: theme.themes_finish_date ?? new Date(),
    token_tg_bot: theme.token_tg_bot ?? '',
    type_themes: theme.type_themes ?? TypeThemeGame.ROULETTE,
    url_game: theme.url_game ?? '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerMobileFile, setBannerMobileFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('name', formData.name);
      payload.append('title', formData.title ?? '');
      payload.append('description', formData.description ?? '');
      payload.append(
        'themes_start_date',
        formatDate(formData.themes_start_date),
      );
      payload.append(
        'themes_finish_date',
        formatDate(formData.themes_finish_date),
      );

      payload.append('token_tg_bot', formData.token_tg_bot ?? '');
      payload.append('type_themes', formData.type_themes);
      payload.append('url_game', formData.url_game ?? '');
      payload.append('start', String(formData.start));
      if (theme.id) payload.append('themeId', String(theme.id));
      if (userInfo) payload.append('user_info', JSON.stringify(userInfo));

      // Файлы, если есть
      if (logoFile) payload.append('logo', logoFile);
      if (bannerFile) payload.append('banner', bannerFile);
      if (bannerMobileFile) payload.append('bannerMobile', bannerMobileFile);

      await onUpdate(payload).unwrap();

      setOpen(false);
      refetch();
      showSnackbar('Тема успешно создана', 'success');
    } catch (error) {
      console.error(error);
      showSnackbar('Ошибка при создании темы', 'error');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={() => handleSubmitForm()}
      confirmTextButton="Подтвердить"
      headerTitle="Создать новую тему для раздачи?"
      disabledFooter={isLoading}
      sxContent={{
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
      }}
      sxHeaderTitle={{ fontSize: '2rem' }}
    >
      <div>
        {error && <ErrorAlert sx={{ marginTop: '24px' }} />}
        <UpdateThemeForm
          refetch={refetch}
          formData={formData}
          setFormData={setFormData}
          setBannerFile={setBannerFile}
          setBannerMobileFile={setBannerMobileFile}
          setLogoFile={setLogoFile}
          onSubmit={handleSubmitForm}
          showSnackbar={showSnackbar}
        />
      </div>
    </Modal>
  );
};

export { UpdateThemeModal };
