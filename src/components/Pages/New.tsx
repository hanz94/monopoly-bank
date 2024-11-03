import { Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { bounce, scaleOnHover } from '../../utils/animations';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

function New() {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const currency = searchParams.get('currency');
    const initialBalance = searchParams.get('initialBalance');
    const crossStartBonus = searchParams.get('crossStartBonus');
    const numberOfPlayers = searchParams.get('numberOfPlayers');

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
                    Waluta: {currency}
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                    Początkowy stan konta: {initialBalance}
                </Typography>
                <Typography sx={{ px: 1.4, mb: 1 }}>
                    Dodatek "Przejście przez START": {crossStartBonus}
                </Typography>
                <Typography sx={{ px: 1.4, mb: 6 }}>
                    Liczba graczy: {numberOfPlayers}
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

export default New;