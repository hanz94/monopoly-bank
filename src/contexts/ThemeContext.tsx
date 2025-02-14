import { createContext, useContext } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorageState } from '@toolpad/core';
import { grey } from '@mui/material/colors';
import { lighten } from '@mui/material';
import { styled } from '@mui/material/styles';

type ModeType = "light" | "dark" | null;

interface ThemeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  toggleTheme: () => void;
}

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
  outlinedButtonLight: lighten('#0000b3', 0.1),
  outlinedButtonDark: lighten('#0039e6', 0.5),
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {

  const prefersDarkMode = useMediaQuery<boolean>('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorageState<ModeType>('selectedMode', prefersDarkMode ? 'dark' : 'light');

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
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? grey[400] : grey[300],
            color: mode === 'light' ? grey[50] : grey[800],
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderColor: mode === 'light' ? themeColor.outlinedButtonLight : themeColor.outlinedButtonDark,
            color: mode === 'light' ? themeColor.outlinedButtonLight : themeColor.outlinedButtonDark,
            '&:hover': {
              borderColor: mode === 'light' ? themeColor.outlinedButtonLight : themeColor.outlinedButtonDark,
              ...(mode === 'dark' && {
                backgroundColor: '#444', // Apply only in dark mode
              }),
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

//Avatar green/red badge style
const StyledBadge = styled(Badge)<{ isOnline: boolean }>(({ theme, isOnline }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: isOnline ? '#44b700' : '#f00', // Green for online, red for offline
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid white',
      content: '""',
    },
  },
}));

//PlayerCard IsPlayerBankSwitch component
const IsPlayerBankSwitch = styled(Switch)<{ isChecked: boolean }>(({ theme, isChecked }) => {
  const mode = theme.palette.mode; // Get mode dynamically from theme

  const personIconSVG = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
      <path fill="#ffffff" d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z"/>
    </svg>
  `);

  const accountBalanceIconSVG = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><g><rect fill="none" height="24" width="24"/></g><g><g><rect height="7" width="3" x="4" y="10"/><rect height="7" width="3" x="10.5" y="10"/><rect height="3" width="20" x="2" y="19"/><rect height="7" width="3" x="17" y="10"/><polygon points="12,1 2,6 2,8 22,8 22,6"/></g></g></svg>
  `);

  return {
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      transition: 'transform 0.3s ease-in-out',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        transition: 'transform 0.3s ease-in-out',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: mode === 'light' ? themeColor.mainLight : themeColor.mainDark,
      width: 32,
      height: 32,
      transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: isChecked ? `url('data:image/svg+xml;utf8,${accountBalanceIconSVG}')` : `url('data:image/svg+xml;utf8,${personIconSVG}')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: mode === 'light' ? '#aab4be' : '#8796A5',
      borderRadius: 20 / 2,
      transition: 'background-color 0.3s ease-in-out',
    },
  };
});

export { ThemeContextProvider, useThemeContext, StyledBadge, IsPlayerBankSwitch };