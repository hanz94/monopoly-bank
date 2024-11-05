import { useEffect } from "react";
import { useGameContext } from "../../contexts/GameContext";
import { useNavigate } from "react-router-dom";

function Bank() {

    const { gameSessionActive, gameInfo } = useGameContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!gameSessionActive || !gameInfo || !gameInfo.currency || !gameInfo.initialBalance || !gameInfo.crossStartBonus || !gameInfo.numberOfPlayers || !gameInfo.playerNamesArray || !["PLN", "EUR", "USD"].includes(gameInfo.currency) || Number(gameInfo.initialBalance) < 1 || Number(gameInfo.initialBalance) > 10000 || Number(gameInfo.crossStartBonus) < 0 || Number(gameInfo.crossStartBonus) > 1000 || (Number(gameInfo.numberOfPlayers) < 2 || Number(gameInfo.numberOfPlayers) > 6) || gameInfo.playerNamesArray.length !== gameInfo.numberOfPlayers) {
            navigate('/404', { replace: true });
    }
    }, []);

    return ( 
        <div>
            <h1>Bank</h1>
        </div>
     );
}

export default Bank;