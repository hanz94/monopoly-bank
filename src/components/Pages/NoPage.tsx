import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { bounce, scaleOnHover } from '../../utils/animations';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

function NoPage() {

    const { mode } = useThemeContext();
    const navigate = useNavigate();

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
                    Błąd 404
                </Typography>
                <Typography sx={{ px: 1.4, mb: 6 }}>
                    Nie znaleziono strony o podanym adresie.
                </Typography>

                <Button 
                    variant="contained" 
                    component={motion.button} 
                    {...scaleOnHover} 
                    sx={{ p: 1.4 }} 
                    onClick={() => navigate('/')}
                >
                    Powrót do strony głównej
                </Button>
            </div>
        </>
     );
}

export default NoPage;