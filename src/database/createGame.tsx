import { db } from "./firebaseConfig";
import { child, get, ref, set } from "firebase/database";

type NewGameOptions = {
    currency: string;
    initialBalance: number;
    crossStartBonus: number;
    numberOfPlayers: number;
    playerNames: string[];
}

const checkIdExists = (id: number): Promise<boolean> => {
    return get(child(ref(db), `/ids/${id}`))
        .then((snapshot) => {
            return snapshot.exists();
        })
        .catch((error) => {
            console.error(error);
            throw new Error(`[checkIdExists] ${error.message}`); 
        });
};

const checkPlayerCodeExists = (playerCode: string): Promise<boolean> => {
    return get(child(ref(db), `/access/${playerCode}`))
        .then((snapshot) => {
            return snapshot.exists();
        })
        .catch((error) => {
            console.error(error);
            throw new Error(`[checkPlayerCodeExists] ${error.message}`); 
        });
}

const createRandomPlayerCode = (length = 6) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result.toUpperCase();
}

export const createGame = async (newGameOptions: NewGameOptions) => {
        
    // Create new random game id
        let newId = Math.floor(Math.random() * 999999) + 100000;

    //Make sure id doesn't already exist in database
        let idExists;
        idExists = await checkIdExists(newId);
        console.log(idExists);
        while (idExists) {
            newId = Math.floor(Math.random() * 999999) + 100000;
            idExists = await checkIdExists(newId);
            console.log(idExists);
        }

    // Add new id in database
    set(ref(db, `/ids/${newId}`), true).catch((error) => {
        console.error(error);
    });

    // Create playerCode for each player
    const playerNames = newGameOptions.playerNames;
    const newPlayerCodes = [];
    for (const _ of playerNames) {
        let newPlayerCode = createRandomPlayerCode();
        let playerCodeExists;
        playerCodeExists = await checkPlayerCodeExists(newPlayerCode);
        while (playerCodeExists) {
            newPlayerCode = createRandomPlayerCode();
            playerCodeExists = await checkPlayerCodeExists(newPlayerCode);
        }
        newPlayerCodes.push(newPlayerCode);
    }
    const newThisPlayerCode = newPlayerCodes[0];

    //TODO: set new token (uuidv4)
    const newToken = "empty";

    let playersDbObj: any = {};
    newPlayerCodes.forEach( (playerCode, index) => {
        playersDbObj[playerCode] = {
            name: playerNames[index],
            isBank: true,
            balance: newGameOptions.initialBalance,
            status: "offline"
        }

        set(ref(db, `/access/${playerCode}`), {
            gameID: newId,
            token: newToken
        }).catch((error) => {
            console.error(error);
        });
    })

    // Add new games/game-newId in database
    const dbGameOptions = (({ playerNames, ...rest }) => rest)(newGameOptions);
    set(ref(db, `/games/game-${newId}`), {
        ...dbGameOptions,
        players: playersDbObj,
        whenCreated: Math.floor(Date.now() / 1000),
        whenExpired: Math.floor(Date.now() / 1000 + 604800)  //1 week

    });

    return {newId, newThisPlayerCode, newToken};
};


