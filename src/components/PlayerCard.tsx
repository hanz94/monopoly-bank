import { Typography, Button, Box } from "@mui/material";
import { db } from "../database/firebaseConfig";
import { ref, set } from "firebase/database";

function PlayerCard({ currency, gameID, playerCode, playerName, playerBalance, playerStatus }: { currency: string, gameID: number | string, playerCode: string, playerName: string, playerBalance: number | string, playerStatus: string }) {

    const decrementBalance = () => {
        set(ref(db, `games/game-${gameID}/players/${playerCode}/balance`), Number(playerBalance) - 1);
    };
    
    const incrementBalance = () => {
        set(ref(db, `games/game-${gameID}/players/${playerCode}/balance`), Number(playerBalance) + 1);
    };

    return ( 
        <>
            <div>Pseudonim: {playerName} <br></br> 
            Kod gracza: {playerCode} <br></br>
            Stan konta: <b>{playerBalance} {currency} </b>
                <Typography sx ={{display: 'inline'}} color={playerStatus === 'online' ? 'success' : 'error'}>({playerStatus})</Typography>
                </div>
            <Box sx={{ mb: 1 }}>
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
