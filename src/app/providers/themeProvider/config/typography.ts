import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Palette } from '@mui/material';

export const typographyConfig:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions)
  | undefined = {
  fontFamily: ['Inter-Regular', 'Inter-SemiBold'].join(','),

  h1: {
    fontSize: '2rem',
    fontWeight: 900,
    lineHeight: '100%',
    fontFamily: 'Inter-SemiBold',
    '@media (max-width:600px)': {
      fontSize: '1.75rem',
      lineHeight: '2.5rem',
    },
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '100%',
    letterSpacing: 0,
    color: 'var(--primary-color)',
    fontFamily: 'Inter-SemiBold',
  },

  h3: {
    fontSize: '1.125rem',
    fontWeight: 600,
    fontFamily: 'Inter-SemiBold',
    lineHeight: '100%',
    color: 'var(--primary-color)',
  },

  subtitle1: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: '2rem',
  },
  subtitle2: {
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: '1.8125rem',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '100%',
    color: 'var(--primary-color)',
  },
  body2: {
    fontSize: '.75rem',
    fontWeight: 400,
    lineHeight: '1.20rem',
    color: 'var(--primary-color)',
  },
  // caption: {
  //     color:"red",

  //     fontSize: '1.5rem',
  //     fontWeight: 600,
  //     lineHeight: '100%',
  //     letterSpacing:"1.5px"
  // },

  caption: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '1.5px',
  },

  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1rem',
    textTransform: 'none',
  },
};
