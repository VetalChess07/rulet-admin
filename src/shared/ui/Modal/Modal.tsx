import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import ModalMUI from '@mui/material/Modal';
import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  SxProps,
  Typography,
  TypographyVariant,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ModalProps as ModalPropsMUI } from '@mui/material/Modal';
import { Theme } from '@emotion/react';
import cls from './Modal.module.scss';

interface ModalProps extends ModalPropsMUI {
  timeout?: number;
  sxContent?: SxProps<Theme>;
  sxConfirm?: SxProps<Theme>;
  sxHeaderTitle?: SxProps<Theme>;
  headerTitle?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  confirmTextButton?: string;
  disabledFooter?: boolean;
  headerTitleVariant?: TypographyVariant;
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
    sxConfirm,
    sxHeaderTitle,
    headerTitleVariant = 'body1',
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
              <Typography
                sx={sxHeaderTitle ?? { fontSize: '1.5rem' }}
                variant={headerTitleVariant}
              >
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
                    sx={sxConfirm ?? {}}
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
