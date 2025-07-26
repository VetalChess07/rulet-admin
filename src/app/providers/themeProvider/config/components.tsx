import { Components, Theme } from '@mui/material';

export const componentsConfig: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: 'Inter-SemiBold',
        padding: '16px 24.5px',
        fontSize: '1.25rem',
        fontWeight: 600,
        textTransform: 'none',
        lineHeight: '100%',
        borderRadius: '5px',
        backgroundColor: 'var(--primary-color)',
        color: 'var(--light)',
        border: 'none',
        outline: 'none',
        transition: 'all .5s',
        marginTop: '0',
        '&:hover': {
          outline: 'none',
          opacity: '.7',
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
          opacity: '.3',
        },
      },
    },
    variants: [
      {
        props: { variant: 'danger' },
        style: {
          backgroundColor: 'var(--danger-color)',
        },
      },
      {
        props: { variant: 'clear' },
        style: {
          backgroundColor: 'transparent',
          padding: '3px',
          minWidth: 'none',
          width: 'fit-content',
        },
      },
      {
        props: { variant: 'secondary' },
        style: {
          backgroundColor: 'var(--light)',
          color: 'var(--primary-color)',
          border: '2px solid var(--light)',
          '&:hover': {
            border: '2px solid var(--primary-color)',
          },
        },
      },
    ],
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
  MuiTextField: {
    styleOverrides: {
      root: {
        transition: 'all .5s',
        fontWeight: 400,
        outline: 'none',
        border: 'none',

        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },

          '&.Mui-disabled': {
            backgroundColor: 'var(--dark-gray)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--dark-gray)',
            },
            '& .MuiOutlinedInput-input': {
              color: 'var(--dark-gray)',
              WebkitTextFillColor: 'var(--dark-gray)',
              '&::placeholder': {
                color: 'var(--dark-gray)',
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
          backgroundColor: 'var(--light)',
          borderRadius: '5px',
          color: 'var(--dark)',
          '&::placeholder': {
            color: 'var(--secondary-text-color)',
            fontFamily: 'Inter-Regular',

            fontSize: '1.25rem',
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
        border: '1px solid var(--primary-color)',
        margin: '0',
        '&.Mui-checked': {
          border: '1px solid var(--primary-color)',
          background: 'var(--primary-color)',
        },
      },
    },
  
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        border: '1px solid var(--secondary-color)',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        padding: '4px',
      },
      flexContainer: {
        justifyContent: 'space-between',
        width: '100%',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'var(--secondary-color)',
        border: '1px solid transparent',
        padding: '10px',
        outline: 'transparent',
        borderRadius: '5px',
        maxWidth: '33%',

        '&.Mui-selected': {
          borderRadius: '5px',
          border: '1px solid transparent',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--light)',
          outline: 'transparent',
          '&:hover': {
            color: 'var(--secondary-light)',
          },
          '&:focus-visible': {
            outline: 'none',
          },
          '&:focus': {
            outline: 'none',
          },
        },
        '&:focus-visible': {
          outline: 'none',
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        fontSize: '1.25rem',
        fontWeight: 400,

        borderRadius: '5px',
        color: 'var(--dark)',
        border: '1px solid var(--primary-color)',
        background: 'var(--light)',

        '&:hover': {
          borderColor: 'var(--primary-color)',
        },
        '&.Mui-focused': {
          borderColor: 'var(--primary-color)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--dark-gray)',
          color: 'var(--dark-gray)',
          borderColor: 'var(--dark-gray)',
        },
      },

      icon: {
        color: 'var(--primary-color)',
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
        '&.Mui-checked': {
          transform: 'translateX(30px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: 'var(--primary-color)',
            opacity: 1,
            border: 0,
          },
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.3,
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          backgroundColor: '--dark-gray',
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
      },
    },
  },
};
