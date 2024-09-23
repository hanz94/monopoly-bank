import './App.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorageState } from '@toolpad/core';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './components/Header/Header';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorageState('selectedMode', prefersDarkMode ? 'dark' : 'light');

  const appTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const changeTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box className="flex flex-col justify-center items-center height-full-mobile-support">

          <Header />
          
          <Paper elevation={0} className='flex flex-col justify-center items-center' sx={{height: '100%', width: '100%'}} square>
              
              
            <Box className="flex flex-col justify-center items-center">
              <p className="text-4xl">
                Monopoly tool
              </p>
              <Button variant="contained" sx={{ mt: 2 }} onClick={changeTheme}>{mode === 'dark' ? <LightModeIcon sx={{mr: 1}} /> : <DarkModeIcon sx={{mr: 1}} />}Switch to {mode === 'dark' ? 'light' : 'dark'} mode</Button>

            </Box>

          </Paper>
        </Box>
      </ThemeProvider>
    
    </>
  )
}

export default App
