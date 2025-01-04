import { db } from "./firebaseConfig";
import { get, child, ref, remove, onDisconnect } from "firebase/database";

const getPlayerCodes = async (gameId: number) => {
    return get(child(ref(db), `/games/game-${gameId}/players`))
        .then((snapshot) => {
            return snapshot.val();
        })
        .catch((error) => {
            console.error(error);
            throw new Error(`[getPlayerCodes] ${error.message}`); 
        });
}

export const deleteGame = async (gameId: number) => {

    const playerCodesObj = await getPlayerCodes(gameId);
    const playerCodes = Object.keys(playerCodesObj);
    for (const playerCode of playerCodes) {
        await remove(ref(db, `access/${playerCode}`));
    }

    onDisconnect(ref(db, `games/game-${gameId}`)).cancel();

    await remove(ref(db, `games/game-${gameId}`));
    await remove(ref(db, `ids/${gameId}`));
}