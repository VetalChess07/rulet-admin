import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  IconButton,
} from '@mui/material';

import CloseIcon from '@shared/assets/icons/close.svg?react';
import IconMoon from '@shared/assets/icons/Moon Sleep.svg';

import cls from './ModalGameLose.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ModalGameLoseProps {
  open: boolean;
  onClose: () => void;
}

export const ModalGameLose = (props: ModalGameLoseProps) => {
  const { onClose, open } = props;

  return (
    <Dialog
      className={cls.ModalGameLose}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: cls.paper,
      }}
    >
      <IconButton className={cls.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent className={cls.content}>
        <Typography className={cls.title} variant="subtitle1">
          <Typography
            component="span"
            className={cls.accentColor}
            variant="subtitle1"
          >
            Повезет
          </Typography>
          &nbsp;в другой раз!
        </Typography>

        <div className={cls.box}>
          <div className={cls.imageWrapper}>
            <img className={cls.img} src={IconMoon} alt="приз" />
          </div>
          <Typography className={cls.name} variant="body1">
            Вы ничего не выиграли
          </Typography>
        </div>
        <Button className={cls.btn} onClick={onClose}>
          Закрыть
        </Button>
      </DialogContent>
    </Dialog>
  );
};
