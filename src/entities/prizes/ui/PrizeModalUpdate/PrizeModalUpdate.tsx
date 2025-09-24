import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useUpdatePrizeMutation } from '../../model/api/prize.api';

import type { PrizeFormData } from '../../model/types/createPrize';
import { PrizeFormCreate } from '../PrizeFormCreate/PrizeFormCreate';

import { Prize } from '../../model/types/prizes';

interface PrizeModalUpdateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  prize: Prize;
  setEditingPrize: Dispatch<SetStateAction<Prize | null>>;
}

const PrizeModalUpdate = (props: PrizeModalUpdateProps) => {
  const { open, setOpen, refetch, prize, setEditingPrize } = props;

  const [onUpdate, { isLoading, error }] = useUpdatePrizeMutation();

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<PrizeFormData>({
    name: prize.name,
    description: prize.description,
    picture: '',
    themeId: null,
    procent: prize.procent,
    type: prize.type,
    created_at: prize.created_at ?? new Date(),
    updated_at: prize.updated_at ?? new Date(),
    attempt: prize.attempt ?? 0,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('prizeId', `${prize.id}`);
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('procent', String(formData.procent));
      payload.append('type', formData.type);

      payload.append('attempt', `${formData.attempt ?? 0}`);

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
        procent: 0,
        type: 'value',
        created_at: new Date(),
        updated_at: new Date(),
        attempt: 0,
      });
      setEditingPrize(null);
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
      headerTitle={`Изменить приз ${prize.name}`}
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

export { PrizeModalUpdate };
