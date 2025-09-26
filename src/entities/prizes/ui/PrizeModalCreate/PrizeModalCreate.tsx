import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useCreatePrizeMutation } from '../../model/api/prize.api';

import type { PrizeFormData } from '../../model/types/createPrize';
import { PrizeFormCreate } from '../PrizeFormCreate/PrizeFormCreate';
import { Theme } from '@/entities/themes';

interface PrizeModalCreateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  theme: Theme;
}

const PrizeModalCreate = (props: PrizeModalCreateProps) => {
  const { open, setOpen, refetch, theme } = props;

  const [onCreate, { isLoading, error }] = useCreatePrizeMutation();

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<PrizeFormData>({
    name: '',
    description: '',
    picture: '',
    themeId: null,
    procent: 0,
    type: 'value',
    created_at: new Date(),
    updated_at: new Date(),
    attempt: 0,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('procent', String(formData.procent));
      payload.append('type', formData.type);

      payload.append('attempt', `${formData.attempt ?? 0}`);

      if (theme.id !== null) {
        payload.append('themeId', String(theme.id));
      }

      if (userInfo) {
        payload.append('user_info', JSON.stringify(userInfo));
      }

      if (logoFile) payload.append('picture', logoFile);

      await onCreate(payload).unwrap();
      refetch();
      setOpen(false);
      showSnackbar('Приз успешно создан', 'success');

      setFormData({
        name: '',
        description: '',
        picture: '',
        themeId: null,
        procent: 0,
        type: 'value',
        created_at: new Date(),
        updated_at: new Date(),
        attempt: 0,
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
        <PrizeFormCreate
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

export { PrizeModalCreate };
