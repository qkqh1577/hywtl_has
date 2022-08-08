import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  typography: {
    fontFamily: [
                  'inter'
                ].join(',')
    ,
    fontSize: 12
  },
  palette:    {
    primary:   {
      main: '#301a9a',
    },
    secondary: {
      main: '#3c3757',
    },
    warning:   {
      main: '#ffd130',
    },
    info:      {
      main: '#7685b2'
    },
    action:    {
      active:             '#5470ff',
      hover:              '#5470FF38',
      selected:           '#5470ff',
      disabled:           '#494949',
      disabledBackground: '#f1eaff',
    },
  },
  components: {
    MuiLink:       {
      styleOverrides: {
        root: {
          cursor: 'pointer'
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        color: 'primary',
      }
    },
    MuiButton:     {
      defaultProps:   {
        color:   'primary',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          maxHeight: '30px',
          minWidth:  '70px',
          fontSize:  '10px',
        }
      }
    }
  }
});

export default mainTheme;