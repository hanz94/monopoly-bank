import { Typography, Button, Box } from "@mui/material";
import { db } from "../database/firebaseConfig";
import { ref, set } from "firebase/database";

function PlayerCard({gameID, playerCode, playerBalance, playerStatus }: { gameID: number | string, playerCode: string, playerBalance: number | string, playerStatus: string }) {

    const decrementBalance = () => {
        set(ref(db, `games/game-${gameID}/players/${playerCode}/balance`), Number(playerBalance) - 1);
    };
    
    const incrementBalance = () => {
        set(ref(db, `games/game-${gameID}/players/${playerCode}/balance`), Number(playerBalance) + 1);
    };

    return ( 
        <>
            <div> 
            <Typography>Identyfikator gry: <b>{gameID}</b> </Typography>
            <Typography>Indywidualny kod gracza: <b>{playerCode}</b> </Typography>

                <Typography sx ={{ my: 0.6 }} color={playerStatus === 'online' ? 'success' : 'error'}>{playerStatus.toLocaleUpperCase()}</Typography>
                </div>
            <Box sx={{ mb: 0.7 }}>
                <Button sx={{display: 'inline', mr: 1}} onClick={decrementBalance}>
                    Zmniejsz o 1
                </Button>
                <Button sx={{display: 'inline', mr: 1}} onClick={incrementBalance}>
                    Powiększ o 1
                </Button>
            </Box>
        </>
    );
}

export default PlayerCard;
