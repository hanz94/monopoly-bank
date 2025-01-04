import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import newModalContent from '../../utils/newModalContent';
import { motion } from 'framer-motion';
import { bounce, scaleOnHover } from '../../utils/animations';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useModalContext } from '../../contexts/ModalContext';
import { useGameContext } from '../../contexts/GameContext';

function MainPage() {
    const { mode } = useThemeContext();
    const { modalOpen } = useModalContext();
    const { resetGameContext } = useGameContext();

    //reset game context
    useEffect(() => {
        resetGameContext();
        // createGame({
        //     currency: 'PLN',
        //     initialBalance: 1500,
        //     crossStartBonus: 0,
        //     numberOfPlayers: 4,
        //     playerNames: ['P1', 'P2', 'P3', 'P4'],
        // });
        // deleteGame(816084);
    }, []);

    return (
        <>

            {mode === 'dark' ? (
                <motion.img 
                    src={'/src/assets/m-logo-white.png'} 
                    className="m-4" 
                    alt="logo"
                    draggable={false}
                    {...bounce} 
                    {...scaleOnHover} 
                />
            ) : (
                <motion.img 
                    src={'/src/assets/m-logo-black.png'} 
                    className="m-4" 
                    alt="logo"
                    draggable={false}
                    {...bounce} 
                    {...scaleOnHover} 
                />
            )}

            <div className="text-center">
                <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>
                    Monopoly Bank
                </Typography>
                <Typography sx={{ px: 1.4, mb: 6 }}>
                    Nowy bezgotówkowy system płatności w Monopoly!
                </Typography>

                <Grid container spacing={{ xs: 2, sm: 0 }}>
                    <Grid size={{xs: 12, sm: 3.5}}>
                        <Button 
                            variant="contained" 
                            component={motion.button} 
                            {...scaleOnHover} 
                            sx={{ p: 1.4 }} 
                            onClick={() => modalOpen(newModalContent.newGame)}
                        >
                            Nowa gra
                        </Button>
                    </Grid>
                    <Grid size={{xs: 12, sm: 5}}>
                        <Button 
                            variant="contained" 
                            component={motion.button} 
                            {...scaleOnHover} 
                            sx={{ p: 1.4 }} 
                            onClick={() => modalOpen(newModalContent.joinGame)}
                        >
                            Dołącz do gry
                        </Button>
                    </Grid>
                    <Grid size={{xs: 12, sm: 3.5}}>
                        <Button 
                            variant="contained" 
                            component={motion.button} 
                            {...scaleOnHover} 
                            sx={{ p: 1.4 }} 
                            onClick={() => modalOpen(newModalContent.instruction)}
                        >
                            Instrukcja
                        </Button>
                    </Grid> 
                </Grid>
            </div>
        </>
    );
}

export default MainPage;
