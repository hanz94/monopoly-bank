import { createContext, useContext } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorageState } from '@toolpad/core';
import { grey } from '@mui/material/colors';
import { lighten } from '@mui/material';

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

  const themeColor = {
    mainLight: lighten('#0000b3', 0.12),
    mainDark: lighten('#0039e6', 0.17),
    backgroundLight: grey[200],
    backgroundDark: grey[900],
    inputLight: function() {
      return lighten(this.mainLight, 0.24);
    },
    inputDark: function() {
      return lighten(this.mainDark, 0.48);
    },
  }

  const appTheme = createTheme({
    palette: {
      mode: mode ?? 'light',
      primary: {
        main: mode === 'light' ? themeColor.mainLight : themeColor.mainDark,
      },
      background: {
        paper: mode === 'light' ? themeColor.backgroundLight : themeColor.backgroundDark,
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: mode === 'light' ? themeColor.mainLight : themeColor.mainDark,
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: mode === 'light' ? themeColor.inputLight() : themeColor.inputDark(),
          },
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? themeColor.inputLight() : themeColor.inputDark(),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? themeColor.inputLight() : themeColor.inputDark(),
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: mode === 'light' ? themeColor.inputLight() : themeColor.inputDark(),
            },
            '&:hover': {
              color: mode === 'light' ? themeColor.inputLight() : themeColor.inputDark(),
            },
          },
        },
      },
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