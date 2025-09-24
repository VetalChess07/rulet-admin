import { Theme } from './theme.types';

export type ThemeFormData = Omit<
  Theme,
  'id' | 'logo' | 'banner' | 'bannerMobile'
> & {
  logo: string | null | File;
  banner: string | null | File;
  bannerMobile: string | null | File;
};
