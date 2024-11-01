import { createContext, useContext } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorageState } from '@toolpad/core';
import { grey } from '@mui/material/colors';

type ModeType = "light" | "dark" | null;

interface ThemeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery<boolean>('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorageState<ModeType>('selectedMode', prefersDarkMode ? 'dark' : 'light');

  const appTheme = createTheme({
    palette: {
      mode: mode ?? 'light',
      primary: {
        main: mode === 'light' ? '#0000b3' : '#0039e6',
      },
      background: {
        paper: mode === 'light' ? grey[200] : grey[900],
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: mode === 'light' ? '#0000b3' : '#0039e6',
          }
        }
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

export { ThemeContextProvider, useThemeContext };