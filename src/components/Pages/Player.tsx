import { Box, Button, Typography } from '@mui/material';
import { useGameContext } from "../../contexts/GameContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { scaleOnHover } from "../../utils/animations";
import GameSessionHandler from '../../database/GameSessionHandler';

function Player() {

    const { gameInfo, dbPlayersInfo } = useGameContext();
    
    const navigate = useNavigate();
    const location = useLocation();
    
    return ( 
        <>
            <GameSessionHandler />

            {/* Welcome + your name */}
            <Typography variant="h5">Witaj {dbPlayersInfo[location.state.playerCode]?.name}!</Typography>

            {/* Your account balance */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">Twoje konto:</Typography>
                <Typography variant="h4">{dbPlayersInfo[location.state.playerCode]?.balance} {gameInfo.currency}</Typography>
            </Box>

            <Button 
                variant="contained" 
                component={motion.button} 
                {...scaleOnHover} 
                sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2 }} 
                onClick={() => navigate('/bank', { state: { gameID: location.state.gameID, playerCode: location.state.playerCode, token: location.state.token } })}
            >
                Wejdź do banku
            </Button>
        </>
     );
}

export default Player;