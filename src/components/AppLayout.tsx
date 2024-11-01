import '../App.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Header from './Header/Header';
import ModalWindow from './ModalWindow/ModalWindow';
import { useThemeContext } from '../contexts/ThemeContext';
import { useModalContext } from '../contexts/ModalContext';
import newModalContent from '../utils/newModalContent';
import { Typography } from '@mui/material';

function AppLayout() {
    const { mode } = useThemeContext();
    const { isModalOpen, modalOpen, modalClose, currentModalContent } = useModalContext();

    return ( 
    <>

    <ModalWindow open={isModalOpen} onClose={modalClose} modalContent={currentModalContent} />

        <Box className="flex flex-col justify-center items-center height-full-mobile-support">
          <Header />
          
          <Paper elevation={0} className='flex flex-col justify-center items-center' sx={{height: '100%', width: '100%'}} square>
            <Box className="flex flex-col justify-center items-center" sx={{mt: -5}}>

            { mode === 'dark' ? <img src='src\assets\m-logo-white.png' className="m-4" alt="logo" /> : <img src='src\assets\m-logo-black.png' className="m-4" alt="logo" /> }
            <div className="text-center">
              <Typography sx={{fontSize: 24, fontWeight: 'bold'}}>Monopoly Bank</Typography>
              <Typography sx={{px: 1.4, mb: 6}}>Nowy bezgotówkowy system płatności w Monopoly!</Typography>

              <Grid container spacing={{xs: 2, sm: 0}}>
                <Grid size={{xs: 12, sm: 3.5}}>
                  <Button variant="contained" sx={{p: 1.4}} onClick={() => modalOpen(newModalContent.newGame)}>Nowa gra</Button>
                </Grid>
                <Grid size={{xs: 12, sm: 5}}>
                  <Button variant="contained" sx={{p: 1.4}} onClick={() => modalOpen(newModalContent.joinGame)}>Dołącz do gry</Button>
                </Grid>
                <Grid size={{xs: 12, sm: 3.5}}>
                  <Button variant="contained" sx={{p: 1.4}} onClick={() => modalOpen(newModalContent.instruction)}>Instrukcja</Button>
                </Grid> 
              </Grid>
                
                
              </div>
            </Box>
          </Paper>
        </Box> 
    </>
        
    );
}

export default AppLayout;