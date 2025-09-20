import { Dispatch } from '@reduxjs/toolkit';
import { Theme } from '../types/theme.types';
import { themeAction } from '../slices/themes.slice';

interface HandleSaveCurrentTheme {
  themes?: Theme[] | null;
  dispatch: Dispatch;
  initialThemeId: number;
}

export const handleSaveCurrentTheme = ({
  dispatch,
  initialThemeId,
  themes,
}: HandleSaveCurrentTheme) => {
  const currentTheme = themes?.find((theme) => theme.id === initialThemeId);

  if (currentTheme) {
    dispatch(themeAction.setCurrentTheme(currentTheme));
    dispatch(themeAction.setCurrentThemeId(currentTheme.id));
  }
};
