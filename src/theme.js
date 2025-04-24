import { createTheme } from '@mui/material/styles';

// Tortoise shell color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#75543E', // shell-brown
      light: '#9C7A64',
      dark: '#533D2C',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#A67D52', // shell-amber
      light: '#D4B08E',
      dark: '#785A3C',
      contrastText: '#FFF',
    },
    accent: {
      main: '#C6A97C', // shell-gold
      light: '#E6CCA3',
      dark: '#A28858',
      contrastText: '#533D2C',
    },
    background: {
      default: '#F5F2E9', // cream
      paper: '#FFF',
      dark: '#362719', // dark-brown
    },
    text: {
      primary: '#362719', // dark-brown
      secondary: '#75543E', // shell-brown
      disabled: '#9C7A64',
    },
  },
  typography: {
    fontFamily: [
      'Playfair Display',
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Montserrat, sans-serif',
    },
    body2: {
      fontFamily: 'Montserrat, sans-serif',
    },
    button: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: '#75543E',
          '&:hover': {
            backgroundColor: '#533D2C',
          },
        },
        containedSecondary: {
          backgroundColor: '#A67D52',
          '&:hover': {
            backgroundColor: '#785A3C',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;