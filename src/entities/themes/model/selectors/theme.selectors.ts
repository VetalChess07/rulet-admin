import { StateSchema } from '@/app/providers/storeProvider/types/stateSchema';

export const getAllThemes = (state: StateSchema) => state.themes.themes;
export const getCurrentTheme = (state: StateSchema) =>
  state.themes.currentTheme;

export const getCurrentThemeId = (state: StateSchema) =>
  state.themes.currentThemeId;
