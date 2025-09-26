import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useCreateDailyMutation } from '../../model/api/daily.api';

import type { DailyFormData } from '../../model/types/createDailys';
import { DailysFormCreate } from '../DailysFormCreate/DailysFormCreate';
import { Theme } from '@/entities/themes';
import { userInfo } from '@/shared/conts/userInfo';

interface DailyModalCreateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  theme: Theme;
}

const DailyModalCreate = (props: DailyModalCreateProps) => {
  const { open, setOpen, refetch, theme } = props;

  const [onCreate, { isLoading, error }] = useCreateDailyMutation();

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<DailyFormData>({
    date_daily: new Date(),
    themeId: theme.id,
    picture: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('date_daily', `${formData.date_daily ?? new Date()}`);
      payload.append('themeId', `${theme.id ?? 0}`);
      if (userInfo) {
        payload.append('user_info', JSON.stringify(userInfo));
      }
      if (logoFile) payload.append('picture', logoFile);

      await onCreate(payload).unwrap();
      refetch();
      setOpen(false);
      showSnackbar('Приз успешно создан', 'success');

      setFormData({
        date_daily: new Date(),
        themeId: theme.id,
        picture: '',
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
      headerTitle={`Создать новый приз для темы ${theme.name}`}
      disabledFooter={isLoading}
      sxContent={{
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
      }}
      sxHeaderTitle={{ fontSize: '1.2rem' }}
    >
      <div>
        <DailysFormCreate
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

export { DailyModalCreate };
