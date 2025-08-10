import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material';

import CloseIcon from '@shared/assets/icons/close.svg?react';

import cls from './ModalGameWin.module.scss';
import { Prize } from '@/entities/prizes';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface ModalGameWinProps {
  open: boolean;
  prize: Prize | null;
  onClose: () => void;
}

export const ModalGameWin = (props: ModalGameWinProps) => {
  const { onClose, open, prize } = props;

  console.log(prize);
  if (!prize) return null;

  return (
    <Dialog
      className={cls.ModalGameWin}
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
          Ваш&nbsp;
          <Typography
            component="span"
            className={cls.accentColor}
            variant="subtitle1"
          >
            выигрыш
          </Typography>
        </Typography>
        <div className={cls.box}>
          <div className={cls.imageWrapper}>
            <img
              className={cls.img}
              src={`${imgApi}${prize.picture}`}
              alt={prize.name}
            />
          </div>
          <Typography className={cls.name} variant="body2">
            {prize.name}
          </Typography>
        </div>
        <Button className={cls.btn} onClick={onClose}>
          Забрть
        </Button>
      </DialogContent>
    </Dialog>
  );
};
