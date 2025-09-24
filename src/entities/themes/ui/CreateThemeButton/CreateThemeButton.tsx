import { Button } from '@mui/material';

import cls from './CreateThemeButton.module.scss';
import { CreateThemeModal } from '../CreateThemeModal/CreateThemeModal';
import { useState } from 'react';

interface CreateThemeButtonProsp {
  refetch: () => void;
}

const CreateThemeButton = (props: CreateThemeButtonProsp) => {
  const { refetch } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateThemeModal refetch={refetch} open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(true)} className={cls.CreateThemeButton}>
        +
      </Button>
    </>
  );
};

export { CreateThemeButton };
