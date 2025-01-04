import { Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { bounce, scaleOnHover } from '../../utils/animations';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';


function Join() {

    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = useThemeContext();

    const gameID = location.state?.gameID;
    const playerGameCode = location.state?.playerCode;

    // Redirect to /404 if the code is invalid
    useEffect(() => {
        if (!gameID || isNaN(parseInt(gameID)) || !playerGameCode || playerGameCode.length !== 6) {
            navigate('/404', { replace: true });
        }
    }, [playerGameCode, navigate]);

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
                <Typography sx={{ px: 1.4, mb: 1, fontWeight: 'bold' }}>
                    Wprowadzone parametry:
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                    Identyfikator gry: {gameID}
                </Typography>
                <Typography sx={{ px: 1.4, mb: 6 }}>
                    Indywidualny kod gracza: {playerGameCode}
                </Typography>
            </div>

            <Button 
                variant="contained" 
                component={motion.button} 
                {...scaleOnHover} 
                sx={{ p: 1.4 }} 
                onClick={() => navigate('/')}
            >
                Powrót do strony głównej
            </Button>
        </>
     );
}

export default Join;