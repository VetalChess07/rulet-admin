export const THEME_COLOR_STORAGE_KEY = 'theme_color';

export type ThemeColor = 'blue' | 'red' | 'green';

export const THEME_COLOR_HEX: Record<ThemeColor, string> = {
  blue: '#1E3573',
  red: '#7D0D08',
  green: '#0E5208',
};

export const themeColors = ['#1E3573', '#7D0D08', '#0E5208'];

export const BOX_SHADOW = `
  0px 55px 65px -22px var(--accent-color),
  0px -55px 65px -22px var(--accent-color)
`;
