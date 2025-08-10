import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  IconButton,
} from '@mui/material';

import CloseIcon from '@shared/assets/icons/close.svg?react';
import IconMoon from '@shared/assets/icons/tgIcon.svg';

import cls from './ModalNoAuth.module.scss';

interface ModalNoAuthProps {
  open: boolean;
  onClose: () => void;
}

export const ModalNoAuth = (props: ModalNoAuthProps) => {
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
        <Typography
          component="span"
          className={cls.accentColor}
          variant="subtitle1"
        >
          Авторизируйтесь
        </Typography>

        <div className={cls.box}>
          <div className={cls.imageWrapper}>
            <img className={cls.img} src={IconMoon} alt="приз" />
          </div>
          <Typography className={cls.name} variant="body1">
            Чтобы получать призы войдите через тг
          </Typography>
        </div>
        <Button className={cls.btn} onClick={onClose}>
          Закрыть
        </Button>
      </DialogContent>
    </Dialog>
  );
};
