import '../App.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './Header/Header';
import ModalWindow from './ModalWindow/ModalWindow';
import useModals from './ModalWindow/ModalUtils';
import { useThemeContext } from '../contexts/ThemeContext';

function AppLayout() {
    const { mode, changeTheme } = useThemeContext();
    const modals = useModals();

    return ( 
    <>

    <ModalWindow open={modals.isModalOpen} onClose={modals.close} modalContent={modals.modalContent} />

        <Box className="flex flex-col justify-center items-center height-full-mobile-support">
          <Header mode={mode ?? 'dark'} modals={modals} />
          
          <Paper elevation={0} className='flex flex-col justify-center items-center' sx={{height: '100%', width: '100%'}} square>
            <Box className="flex flex-col justify-center items-center">
              <p className="text-4xl">
                Monopoly tool
              </p>
              <Button variant="contained" sx={{ mt: 2 }} onClick={changeTheme}>
                {mode === 'dark' ? <LightModeIcon sx={{mr: 1}} /> : <DarkModeIcon sx={{mr: 1}} />}
                Switch to {mode === 'dark' ? 'light' : 'dark'} mode
              </Button>
            </Box>
          </Paper>
        </Box> 
    </>
        
    );
}

export default AppLayout;