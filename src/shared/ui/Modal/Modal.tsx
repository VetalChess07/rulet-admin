import Box from '@mui/material/Box';
import ModalMUI from '@mui/material/Modal';
import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ModalProps as ModalPropsMUI } from '@mui/material/Modal';
import { Theme } from '@emotion/react';
import React, { ReactNode } from 'react';
import cls from './Modal.module.scss';

interface ModalProps extends ModalPropsMUI {
  timeout?: number;
  sxContent?: SxProps<Theme>;
  headerTitle?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  confirmTextButton?: string;
  disabledFooter?: boolean;
}

export const Modal = (props: ModalProps) => {
  const {
    open,
    onClose,
    children,
    timeout = 500,
    sxContent,
    headerTitle,
    onConfirm,
    header,
    footer,
    confirmTextButton,
    disabledFooter,
    ...other
  } = props;

  return (
    <ModalMUI
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout } }}
      {...other}
    >
      <Fade in={open}>
        <Box sx={sxContent} className={cls.modalContent}>
          {header ? (
            <>{header}</>
          ) : (
            <div className={cls.modalHeader}>
              <Typography className={cls.headerTitle} variant="body1">
                {headerTitle ?? ''}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={onClose}
                size="small"
                className={cls.closeButton}
              >
                <CloseIcon className={cls.icon} fontSize="small" />
              </IconButton>
            </div>
          )}

          <div className={cls.modalBody}>{children}</div>

          <div className={cls.modalFooter}>
            {footer ? (
              <>{footer}</>
            ) : (
              <>
                <Button
                  disabled={disabledFooter}
                  color="primary"
                  onClick={onClose}
                >
                  Закрыть
                </Button>
                {onConfirm && (
                  <Button
                    disabled={disabledFooter}
                    color="primary"
                    onClick={onConfirm}
                  >
                    {confirmTextButton}
                  </Button>
                )}
              </>
            )}
          </div>
        </Box>
      </Fade>
    </ModalMUI>
  );
};
