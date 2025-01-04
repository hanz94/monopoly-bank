import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGameContext } from "../../contexts/GameContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { scaleOnHover } from "../../utils/animations";
import PlayerCard from "../PlayerCard";
import { db } from "../../database/firebaseConfig";
import { ref, onValue, off, onDisconnect } from "firebase/database";
import { deleteGame } from "../../database/deleteGame";

type DbPlayersInfo = {
    [key: string]: {
        name: string,
        balance: number,
        status: string
    }
  }

function Bank() {

    const { gameInfo, setGameInfo, setGameSessionActive, dbPlayersInfo, setDbPlayersInfo, updateOnlineStatus } = useGameContext();

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state.gameID);
    console.log(location.state.playerCode);
    console.log(location.state.token);

    // Verify token from Firebase
    useEffect(() => {

        const currentTokenRef = ref(db, `/access/${location.state.playerCode}/token`);
        onValue(currentTokenRef, (snapshot) => {
            if (snapshot.exists() && snapshot.val() == location.state.token) {
                setGameSessionActive(true);
                console.log('Token verified');
            }
            else {
                setGameSessionActive(false);
                console.log('Token not verified');
                navigate('/session-expired', { replace: true });
            }
        })
    }, []);

    //watch and update online status
    useEffect(() => {
        const connectedRef = ref(db, '.info/connected');
        onValue(connectedRef, (snapshot) => {
            if (snapshot.val() === true) {
                // Set online status and prepare for disconnection
                updateOnlineStatus(location.state.gameID, location.state.playerCode, "online");
    
                // Use onDisconnect to set status to "offline" if disconnected
                const playerStatusRef = ref(db, `/games/game-${location.state.gameID}/players/${location.state.playerCode}/status`);
                onDisconnect(playerStatusRef).set("offline");
            } else {
                // Optionally handle local offline status
                updateOnlineStatus(location.state.gameID, location.state.playerCode, "offline");
            }
        });
        // Clean up listener on unmount
        return () => off(connectedRef);
    }, []);

    //get players data for view
    useEffect(() => {
        const gamesRef = ref(db, 'games/game-' + location.state.gameID);
        onValue(gamesRef, (snapshot) => {
            const dbData = snapshot.val();

            const updatedPlayersInfo: DbPlayersInfo = {};
            for (const player in dbData.players) {
                updatedPlayersInfo[player] = {
                    name: dbData.players[player].name,
                    balance: dbData.players[player].balance,
                    status: dbData.players[player].status
                };
            }

            setDbPlayersInfo(updatedPlayersInfo);

            setGameInfo({
                ...gameInfo,
                currency: dbData.currency,
                initialBalance: dbData.initialBalance,
                crossStartBonus: dbData.crossStartBonus,
                numberOfPlayers: dbData.numberOfPlayers,
                gameID: location.state.gameID,
                playerCode: location.state.playerCode,
                token: location.state.token,
            });
        });
    }, []);

    // useEffect(() => {
    //     if (!gameSessionActive || !gameInfo || !gameInfo.currency || !gameInfo.initialBalance || !gameInfo.crossStartBonus || !gameInfo.numberOfPlayers || !gameInfo.playerNames || !["PLN", "EUR", "USD"].includes(gameInfo.currency) || Number(gameInfo.initialBalance) < 1 || Number(gameInfo.initialBalance) > 10000 || Number(gameInfo.crossStartBonus) < 0 || Number(gameInfo.crossStartBonus) > 1000 || (Number(gameInfo.numberOfPlayers) < 2 || Number(gameInfo.numberOfPlayers) > 6) || gameInfo.playerNames.length !== gameInfo.numberOfPlayers) {
    //         navigate('/404', { replace: true });
    //     }
    // }, [gameSessionActive, gameInfo, navigate]);

    return ( 
        <div>

        {/* {dbPlayersInfo[location.state.playerCode] ? (
            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                Zalogowano jako: {dbPlayersInfo[location.state.playerCode]?.name} ({location.state.playerCode})<br />
                Stan konta: <b>{dbPlayersInfo[location.state.playerCode]?.balance} {gameInfo.currency}</b><br />
                Twój status: 
                <span style={{ color: dbPlayersInfo[location.state.playerCode]?.status == 'online' ? 'green' : 'red' }}>&nbsp;
                    {dbPlayersInfo[location.state.playerCode]?.status.toUpperCase()}
                </span>
            </Typography>
        ) : (
            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>Ładowanie danych...</Typography>
        )} */}

            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>Witamy na stronie Banku!</Typography>
            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>Na bieżąco sprawdzaj i zarządzaj kontami innych graczy.</Typography>

            {/* <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>Cross start bonus (serwer): {gameInfo.crossStartBonus}</Typography> */}

            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
            {Object.keys(dbPlayersInfo).map((playerCode, index) => {
            return (
                <div key={index}>
                    <PlayerCard
                        currency={gameInfo.currency}
                        gameID={gameInfo.gameID}
                        playerCode={playerCode}
                        playerName={dbPlayersInfo[playerCode].name}
                        playerBalance={dbPlayersInfo[playerCode].balance}
                        playerStatus={dbPlayersInfo[playerCode].status}
                    />
                </div>
                );
            })}
            </Typography>

            <Button 
                        variant="contained" 
                        component={motion.button} 
                        {...scaleOnHover} 
                        sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2 }} 
                        onClick={async () => await deleteGame(location.state.gameID).then(() => navigate('/'))}
                    >
                        Usuń sesję gry (ID: {location.state.gameID})
                    </Button>
           
        </div>
    );
}

export default Bank;
