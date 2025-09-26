import { Modal } from '@/shared/ui/Modal/Modal';
import { Dispatch, SetStateAction } from 'react';
import { Typography } from '@mui/material';

import cls from './ModalApproveDeleteTheme.module.scss';
import { useDeleteThemeMutation } from '../../model/api/theme.api';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { handleDeleteTheme } from '../../model/lib/handleDeleteTheme';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getAllThemes } from '../../model/selectors/theme.selectors';

interface ModalApproveDeleteThemeProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  themeId: number;
  themeName: string;
  refetch: () => void;
}

const ModalApproveDeleteTheme = (props: ModalApproveDeleteThemeProps) => {
  const { open, setOpen, themeId, themeName, refetch } = props;
  const themes = useAppSelector(getAllThemes);

  const [searchParams, setSearchParams] = useSearchParams();

  const [onDelete, { isError, isLoading }] = useDeleteThemeMutation();

  const onSubmitDeleteTheme = () => {
    const currentTheme = themes?.find((theme) => theme.id !== themeId) ?? null;

    console.log(currentTheme);

    handleDeleteTheme({
      onDelete,
      themeId,
      setOpen,
      refetch,
      searchParams,
      setSearchParams,
      currentTheme,
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onSubmitDeleteTheme}
        confirmTextButton="Подтвердить"
        headerTitle="Удаить тему?"
        disabledFooter={isLoading}
        sxContent={{ padding: '24px' }}
        sxHeaderTitle={{ color: 'var( --danger-color)', fontSize: '1.5rem' }}
        sxConfirm={{ background: 'var( --danger-color)' }}
      >
        <div className={cls.ModalApproveDeleteTheme}>
          {isError && <ErrorAlert sx={{ marginTop: '24px' }} />}
          <Typography className={cls.title} variant="body1">
            Вы действительно хотитет удалить тему: {themeName} ?
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export { ModalApproveDeleteTheme };
