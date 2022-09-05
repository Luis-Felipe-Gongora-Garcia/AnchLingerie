import { createContext, useContext } from 'react';
import { LightTheme } from '../themes';
import { ThemeProvider, Box } from '@mui/system';

interface IThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({});

export const AppThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
}) => {
  const theme = LightTheme;
  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={LightTheme}>
        <Box
          width='100vw'
          height='100vh'
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
