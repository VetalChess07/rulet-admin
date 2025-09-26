import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import cls from './CreateThemeModal.module.scss';
import { CreateThemeForm } from '../CreateThemeForm/CreateThemeForm';
import { ThemeFormData } from '../../model/types/createTheme';
import { TypeThemeGame } from '../../model/types/theme.types';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getCurrentThemeId } from '../../model/selectors/theme.selectors';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { createThemeAxios } from '../../model/lib/createThemeAxios';
import { useCreateThemeMutation } from '../../model/api/theme.api';
import { formatDate } from '@/shared/lib/formatDate';
import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

interface CreateThemeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

const CreateThemeModal = (props: CreateThemeModalProps) => {
  const { open, setOpen, refetch } = props;

  const [onCreate, { isLoading, error }] = useCreateThemeMutation();

  const { showSnackbar } = useSnackbar();

  const themeId = useAppSelector(getCurrentThemeId);

  const [formData, setFormData] = useState<ThemeFormData>({
    name: '',
    logo: '',
    banner: '',
    bannerMobile: '',
    title: '',
    description: '',
    start: false,
    themes_start_date: new Date(),
    themes_finish_date: new Date(),
    token_tg_bot: '',
    type_themes: TypeThemeGame.ROULETTE,
    url_game: '',
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
      if (themeId) payload.append('themeId', String(themeId));
      if (userInfo) payload.append('user_info', JSON.stringify(userInfo));

      // Файлы, если есть
      if (logoFile) payload.append('logo', logoFile);
      if (bannerFile) payload.append('banner', bannerFile);
      if (bannerMobileFile) payload.append('bannerMobile', bannerMobileFile);

      payload.append('themeId', `${themeId ?? 0}`);

      await onCreate(payload).unwrap();

      setOpen(false);
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
      <div className={cls.CreateThemeModal}>
        {error && <ErrorAlert sx={{ marginTop: '24px' }} />}
        <CreateThemeForm
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

export { CreateThemeModal };
