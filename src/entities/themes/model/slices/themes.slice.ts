import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from '../types/theme.types';

const initialState: ThemeState = {
  themes: null,
  currentTheme: null,
  currentThemeId: null,
};

export const themeState = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setThemes: (state, action: PayloadAction<Theme[]>) => {
      state.themes = action.payload;
    },
    setCurrentTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
    },
    setCurrentThemeId: (state, action: PayloadAction<number>) => {
      state.currentThemeId = action.payload;
    },
    setCurrentThemeClear: (state) => {
      state.currentTheme = null;
    },
    clear: () => ({
      themes: null,
      currentTheme: null,
      currentThemeId: null,
    }),
  },
});

export const themeAction = themeState.actions;
export const themeReducer = themeState.reducer;
