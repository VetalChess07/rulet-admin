import { Dispatch, SetStateAction } from 'react';
import { DeleteThemeMutationFn } from '../api/theme.api';
import { SetURLSearchParams } from 'react-router-dom';
import { Theme } from '../types/theme.types';

type HandleDeleteThemeParams = {
  onDelete: DeleteThemeMutationFn;
  setOpen: Dispatch<SetStateAction<boolean>>;
  themeId: number;
  refetch: () => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  currentTheme: Theme | null;
};

export const handleDeleteTheme = async ({
  onDelete,
  setOpen,
  themeId,
  refetch,
}: HandleDeleteThemeParams) => {
  try {
    await onDelete({ themeId });
    setOpen(false);

    refetch();
  } catch (err) {
    console.error(err);
  }
};
