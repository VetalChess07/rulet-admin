export enum TypeThemeGame {
  ROULETTE = 'roulette',
  COIN_ERASURE = 'coin erasure',
  WINWIN = 'win-win',
}

export interface Theme {
  id: number;
  name: string;
  logo: string | null;
  banner: string | null;
  bannerMobile: string | null;
  title: string | null;
  description: string | null;
  start: boolean | null;
  themes_start_date: Date | null;
  themes_finish_date: Date | null;
  token_tg_bot: string | null;
  deleted?: boolean;
  type_themes: TypeThemeGame;
  url_game: string;
}

export interface ThemeState {
  themes: Theme[] | null;
  currentTheme: Theme | null;
  currentThemeId: number | null;
}
