import { backdropClasses, colors, Components, Theme } from '@mui/material';

export const componentsConfig: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: 'Inter-Bold',
        padding: '13.5px 20px',
        fontSize: '1.25rem',
        fontWeight: 600,
        textTransform: 'none',
        lineHeight: '100%',
        borderRadius: '10px',
        background:
          'linear-gradient(to bottom, rgba(90, 161, 239, 1), rgba(72, 117, 185, 1))',
        backgroundSize: '100% 200%',
        backgroundPosition: 'top',
        color: 'var(--light-btn-color)',
        border: 'none',
        outline: 'none',
        transition: 'all .5s',
        marginTop: '0',
        '&:active': {
          transform: 'scale(1.1)',
        },
        '&:hover': {
          outline: 'none',
          backgroundPosition: 'bottom',
          border: 'none',
        },
        '&:focus-visible': {
          outline: 'none',
          border: 'none',
        },
        '&:focus': {
          outline: 'none',
          border: 'none',
        },
        '&.Mui-disabled': {
          background: '#3D414E4D',
          color: '#696E80',
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        color: 'var(--primary-color)',
        transition: 'all .5s',
        fontSize: '1.25rem',
        '&:hover': {
          color: 'var(--danger-color)',
        },
      },
    },
  },
};
