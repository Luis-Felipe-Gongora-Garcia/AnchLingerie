import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#ffebee',
      dark: '#ccb9bc',
      light: '#ffffff',
      contrastText: '#212121',
    },
    secondary: {
      main: '#f8bbd0',
      dark: 'c48b9f',
      light: '#ffeeff',
      contrastText: '#212121',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#ffebee',
          },
        },
      },
    },
  },
});
