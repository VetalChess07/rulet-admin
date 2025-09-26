import { useRef, useState, useEffect, ReactNode, memo } from 'react';
import { Box, Button, Typography, SxProps } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Theme } from '@emotion/react';

import cls from './fileUploader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface FileUploaderProps {
  accept?: string;
  label?: string;
  onChange?: (file: File | null) => void;
  Icon?: ReactNode;
  title?: string;
  sxInner?: SxProps<Theme> | null;
  sxTitle?: SxProps<Theme> | null;
  sxButton?: SxProps<Theme> | null;
  titleVariant?: 'body1' | 'body2' | 'subtitle1' | 'subtitle2';
  classNameButton?: string;
  classNameTitle?: string;
  defaultImageUrl?: string;
  defaultImageAlt?: string;
  emptyText?: string;
}

export const FileUploader = memo((props: FileUploaderProps) => {
  const {
    accept = 'image/*',
    label = 'Загрузить картинку',
    onChange,
    Icon,
    title = '',
    sxInner = {},
    sxButton = {},
    sxTitle = {},
    titleVariant = 'body2',
    classNameTitle = '',
    defaultImageUrl,
    defaultImageAlt = '',
    emptyText = 'Загрузите картинку',
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onChange?.(selectedFile);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const IconButton = Icon ?? <UploadFileIcon />;

  return (
    <Box
      className={cls.FileUploader}
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', ...sxInner }}
    >
      {title && (
        <Typography
          sx={sxTitle}
          className={classNames(cls.classNameTitle, {}, [classNameTitle])}
          component="span"
          textAlign="left"
          variant={titleVariant}
        >
          {title}
        </Typography>
      )}
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
      />
      <Button
        className={classNames(cls.classNameButton, {}, [cls.button])}
        variant="contained"
        startIcon={IconButton}
        sx={{ ...sxButton }}
        onClick={handleClick}
      >
        {label}
      </Button>

      <Box display="flex" alignItems="center" gap={2} mt={1}>
        {preview || defaultImageUrl ? (
          <Box sx={{ position: 'relative', width: 80, height: 80 }}>
            <img
              src={preview || defaultImageUrl}
              alt={defaultImageAlt || 'preview'}
              style={{
                width: 80,
                height: 80,
                objectFit: 'contain',
                borderRadius: 4,
              }}
            />
            {/* <Button
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                minWidth: 'auto',
                padding: '2px',
                borderRadius: '50%',
              }}
              onClick={handleRemove}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </Button> */}
          </Box>
        ) : (
          <Typography>{emptyText}</Typography>
        )}
      </Box>
    </Box>
  );
});

FileUploader.displayName = 'FileUploadSingle';
