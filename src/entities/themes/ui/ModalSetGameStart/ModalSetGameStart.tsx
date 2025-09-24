import { Modal } from '@/shared/ui/Modal/Modal';
import { Switch } from '@/shared/ui/Switch/Switch';
import { useState, useCallback } from 'react';
import { Typography } from '@mui/material';

import cls from './ModalSetGameStart.module.scss';
import {
  useStartGameMutation,
  useStopGameMutation,
} from '../../model/api/theme.api';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

interface ModalSetGameStartProps {
  isStart: boolean;
  themeId: number;
  refetch: () => void;
}

const ModalSetGameStart = (props: ModalSetGameStartProps) => {
  const { isStart, themeId, refetch } = props;

  const [
    onStartGame,
    { isLoading: isLoadingStartGame, isError: isErrorStartGame },
  ] = useStartGameMutation();
  const [
    onStopGame,
    { isLoading: isLoadingStopGame, isError: isErrorStopGame },
  ] = useStopGameMutation();

  const [isActive, setIsActive] = useState(isStart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSwitch = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = useCallback(() => {
    if (isActive) {
      onStopGame({ themeId: themeId ?? 1 });
      refetch();
    } else {
      onStartGame({ themeId: themeId ?? 1 });
      refetch();
    }
    if (!isErrorStartGame || !isErrorStopGame) {
      setIsActive((prev) => !prev);
      setIsModalOpen(false);
    }
  }, [isActive, isStart]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Switch
        stylesInner={{ width: 'auto' }}
        checked={isStart}
        onClick={handleSwitch}
        // onChange={handleSwitch}
      />

      <Modal
        open={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        confirmTextButton="Подтвердить"
        headerTitle="Подтвердить"
        disabledFooter={isLoadingStartGame || isLoadingStopGame}
      >
        <div className={cls.ModalSetGameStart}>
          {isErrorStartGame ||
            (isErrorStopGame && <ErrorAlert sx={{ marginTop: '24px' }} />)}
          <Typography className={cls.title} variant="body1">
            Вы действительно хотитет <br /> сменить статус игры на
            {isStart ? ' Остановленую' : ' Начавшуюся'}
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export { ModalSetGameStart };
