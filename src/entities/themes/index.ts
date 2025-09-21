export { themeAction, themeReducer } from './model/slices/themes.slice';
export type {
  ThemeState,
  Theme,
  TypeThemeGame,
} from './model/types/theme.types';

export { themeApi, useGetAllThemeQuery } from './model/api/theme.api';
