import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useModalContext } from '../../contexts/ModalContext';
import { useGameContext } from '../../contexts/GameContext';
import newModalContent from '../../utils/newModalContent';
import { motion } from 'framer-motion';
import { bounce, scaleOnHover } from '../../utils/animations';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

function New() {

    const { modalOpen } = useModalContext();
    const { playerNames, setPlayerNames, playerNamesDefined, setPlayerNamesDefined } = useGameContext();

    const navigate = useNavigate();
    const location = useLocation();

    const currency = location.state?.cr
    const initialBalance = location.state?.ib
    const crossStartBonus = location.state?.csb
    const numberOfPlayers = location.state?.np

    
    useEffect(() => {
        setPlayerNames([]);
        setPlayerNames(Array.from({ length: location.state.np }, (_, i) => `Gracz ${i + 1}`));
        setPlayerNamesDefined(false)
    }, [numberOfPlayers]);

    useEffect(() => {
        // Redirect to /404 if the values are invalid
        if (!currency || !initialBalance || !crossStartBonus || !numberOfPlayers || !["PLN", "EUR", "USD"].includes(currency) || Number(initialBalance) < 1 || Number(initialBalance) > 10000 || Number(crossStartBonus) < 0 || Number(crossStartBonus) > 1000 || (Number(numberOfPlayers) < 2 || Number(numberOfPlayers) > 6)) {
            navigate('/404', { replace: true });
        }
    }, [currency, initialBalance, crossStartBonus, numberOfPlayers, navigate]);

    const { mode } = useThemeContext();

    if (!currency || !initialBalance || !crossStartBonus || !numberOfPlayers || !["PLN", "EUR", "USD"].includes(currency) || Number(initialBalance) < 1 || Number(initialBalance) > 10000 || Number(crossStartBonus) < 0 || Number(crossStartBonus) > 1000 || (Number(numberOfPlayers) < 2 || Number(numberOfPlayers) > 6)) {
        return null;
    }

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
                <Typography sx={{ px: 1.4, mb: 1, mt: 2, fontWeight: 'bold' }}>
                    Wprowadzone parametry:
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                    Waluta: <b>{currency}</b>
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                    Początkowy stan konta: <b>{initialBalance}</b>
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                    Dodatek "Przejście przez START": <b>{crossStartBonus}</b>
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                     Liczba graczy: <b>{numberOfPlayers} {playerNamesDefined ? `(${playerNames.join(", ")})` : ''}</b>
                </Typography>
                <Typography sx={{ px: 1.4, mb: 5, fontWeight: 'bold' }}>
                    {playerNamesDefined ? 'Gotowi! Zaczynamy?' : 'Następny krok: Konfiguracja graczy'}
                </Typography>

            </div>

            <Grid container spacing={{ xs: 2, sm: 2 }} justifyContent='center'>

                <Grid size={{xs: 12, sm: 3.5}} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        variant="contained" 
                        component={motion.button} 
                        {...scaleOnHover} 
                        sx={{ p: 1.4 }} 
                        onClick={() => modalOpen(newModalContent.newGame)}
                    >
                        Zmień parametry
                    </Button>
                </Grid>

                <Grid size={{xs: 12, sm: 3.5}} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        variant="contained" 
                        component={motion.button} 
                        {...scaleOnHover} 
                        sx={{ p: 1.4 }} 
                        onClick={() => modalOpen(newModalContent.defineNewPlayers)}
                    >
                        Konfiguruj graczy
                    </Button>
                </Grid>

                <Grid size={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        variant="contained" 
                        component={motion.button} 
                        {...scaleOnHover} 
                        sx={{ p: 1.4 }} 
                        onClick={() => navigate('/')}
                        disabled={!playerNamesDefined}
                    >
                        Rozpocznij grę
                    </Button>
                </Grid>

                <Grid size={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        variant="contained" 
                        component={motion.button} 
                        {...scaleOnHover} 
                        sx={{ p: 1.4 }} 
                        onClick={() => navigate('/')}
                    >
                        Powrót do strony głównej
                    </Button>
                </Grid>

            </Grid>
        </>
     );
}

export default New;