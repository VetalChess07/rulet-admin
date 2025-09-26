import { backdropClasses, colors, Components, Theme } from '@mui/material';

import CheckboxIcon from '@shared/assets/icons/checked.svg?react';

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
        boxShadow: `0px 12px 36px rgba(51, 84, 134, 0.4)`,
        '&:active': {
          transform: 'scale(1.2)',
        },
        '&:hover': {
          outline: 'none',
          backgroundPosition: 'bottom',
          border: 'none',
          transform: 'scale(1.1)',
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
          boxShadow: 'none',
          fontFamily: 'Inter-SemiBold',
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
  MuiSelect: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        fontWeight: 400,

        borderRadius: '5px',
        color: 'var(--light)',
        border: 'none',
        background:
          'linear-gradient(to bottom, rgba(90, 161, 239, 1), rgba(72, 117, 185, 1))',

        '&:hover': {
          borderColor: 'var(--accent-color)',
        },
        '&.Mui-focused': {
          borderColor: 'var(--accent-color)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--primary-text-color)',
          color: 'var(--primary-text-color)',
          borderColor: 'var(--primary-text-color)',
        },
      },
      select: {
        padding: '4px 8px',
      },
      icon: {
        color: 'var(--light)',
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 60,
        height: 28,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      },
      switchBase: {
        padding: 2,
        transition: 'all .3s ease',
        background:
          'linear-gradient(to bottom, rgba(90, 161, 239, 1), rgba(72, 117, 185, 1))',
        '&.Mui-checked': {
          transform: 'translateX(30px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            background:
              'linear-gradient(to bottom, rgba(90, 161, 239, 1), rgba(72, 117, 185, 1))',
            opacity: 1,
            border: 0,
          },
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.3,
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          background:
            'linear-gradient(to bottom, rgba(90, 161, 239, 1), rgba(72, 117, 185, 1))',
        },
      },
      thumb: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
      track: {
        borderRadius: 34 / 2,
        backgroundColor: 'var(--dark-gray)',
        opacity: 1,
        transition: 'background-color 0.3s',
        background: 'var(--primary-text-color)',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '4px',
        background:
          'linear-gradient(to bottom, rgba(90, 161, 239, 0.95), rgba(72, 117, 185, 0.95))',
        color: '#fff',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
        padding: '4px',
      },
      list: {
        padding: 0,
        '& .MuiMenuItem-root': {
          fontSize: '1rem',
          borderRadius: '4px',
          margin: '2px 0',
          transition: 'background 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255,255,255,0.25)',
          },
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        transition: 'all .5s',
        fontWeight: 400,
        outline: 'none',
        border: 'none',

        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--danger-color)',
          },

          '&.Mui-disabled': {
            backgroundColor: 'var(--color-text-footer)',
            '& .MuiOutlinedInput-notchedOutline': {
              backgroundColor: 'var(--color-text-footer)',
              borderColor: 'var(--color-text-footer)',
            },
            '& .MuiOutlinedInput-input': {
              color: 'var(--border-color)',
              WebkitTextFillColor: 'var(--border-color)',
              '&::placeholder': {
                color: 'var(--border-color)',
              },
            },
          },
        },

        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            borderColor: 'var(--primary-color)',
          },
        '& .MuiOutlinedInput-input': {
          padding: '16px',
          backgroundColor: 'var( --accent-color)',
          borderRadius: '5px',
          color: 'var(--light)',
          '&::placeholder': {
            color: 'var(--light)',
            fontFamily: 'Inter-Regular',

            fontWeight: 400,
            lineHeight: '100%',
            opacity: '1',
          },
          '&:focus': {
            border: 'none',
            outline: 'none',
          },
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        width: '17px',
        height: '17px',
        padding: '4px',
        borderRadius: '4.72px',
        outline: 'none',
        border: '1px solid var(--accent-color)',
        margin: '0',
        '&.Mui-checked': {
          border: '1px solid var(--accent-color)',
          background: 'var(--accent-color)',
        },
      },
    },
    defaultProps: {
      checkedIcon: <CheckboxIcon />,
      icon: <div />,
    },
  },
};
