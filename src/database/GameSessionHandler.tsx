import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "./firebaseConfig";
import { ref, onValue, off, onDisconnect } from "firebase/database";
import { useGameContext } from "../contexts/GameContext";

type DbPlayersInfo = {
    [key: string]: {
        name: string,
        balance: number,
        status: string
    }
  }

function GameSessionHandler() {

        const {
            gameInfo,
            setGameInfo,
            setGameSessionActive,
            setDbPlayersInfo,
            updateOnlineStatus,
        } = useGameContext();    
    
        const navigate = useNavigate();
        const location = useLocation();
        
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
        
                    //sort players by name
                    // Convert the object into an array of entries
                    const entries = Object.entries(updatedPlayersInfo);
                    // Sort the array by the "name" property
                    entries.sort(([, a], [, b]) => a.name.localeCompare(b.name));
                    // Convert the sorted array back into an object
                    const sortedPlayersInfo = Object.fromEntries(entries);
        
                    setDbPlayersInfo(sortedPlayersInfo);
        
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


    return null; // This component doesn't render anything visible

}

export default GameSessionHandler;