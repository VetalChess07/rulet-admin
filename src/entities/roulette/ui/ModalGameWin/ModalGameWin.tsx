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
import { SlotData } from '../../model/types/roulette';

import CloseIcon from '@shared/assets/icons/close.svg?react';

import cls from './ModalGameWin.module.scss';

interface ModalGameWinProps {
  open: boolean;
  prize: SlotData;
  onClose: () => void;
}

export const ModalGameWin = (props: ModalGameWinProps) => {
  const { onClose, open, prize } = props;

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
            <img className={cls.img} src={prize[0]} alt="приз" />
          </div>
          <Typography className={cls.name} variant="body2">
            Название предмета
          </Typography>
        </div>
        <Button className={cls.btn} onClick={onClose}>
          Забрть
        </Button>
      </DialogContent>
    </Dialog>
  );
};
