import { Modal } from '@/shared/ui/Modal/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { userInfo } from '@/shared/conts/userInfo';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useUpdateDailyMutation } from '../../model/api/daily.api';

import { DailysFormUpdate } from '../DailysFormUpdate/DailysFormUpdate';

import { Daily } from '../../model/types/dailys';

interface DailyModalUpdateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  daily: Daily;
  setEditingPrize: Dispatch<SetStateAction<Daily | null>>;
}

const DailyModalUpdate = (props: DailyModalUpdateProps) => {
  const { open, setOpen, refetch, daily, setEditingPrize } = props;

  const [onUpdate, { isLoading, error }] = useUpdateDailyMutation();

  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<Omit<Daily, 'themeId'>>({
    date_daily: daily.date_daily ?? new Date(),
    id: daily.id,
    picture: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmitForm = async () => {
    try {
      const payload = new FormData();

      payload.append('dailyId', `${daily.id ?? 0}`);
      payload.append('date_daily', `${formData.date_daily ?? new Date()}`);
      if (userInfo) {
        payload.append('user_info', JSON.stringify(userInfo));
      }
      if (logoFile) payload.append('picture', logoFile);

      await onUpdate(payload).unwrap();
      refetch();
      setOpen(false);
      showSnackbar('Приз успешно создан', 'success');

      setFormData({
        date_daily: daily.date_daily ?? new Date(),
        id: daily.id,
        picture: '',
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
      headerTitle={`Изменить ежедневное задание ${daily.id}`}
      disabledFooter={isLoading}
      sxContent={{
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
      }}
      sxHeaderTitle={{ fontSize: '1.2rem' }}
    >
      <div>
        <DailysFormUpdate
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

export { DailyModalUpdate };
