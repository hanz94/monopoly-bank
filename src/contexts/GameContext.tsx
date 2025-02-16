import { createContext, useContext, useState } from 'react';
import { db } from "../database/firebaseConfig";
import { get, ref, set, serverTimestamp } from "firebase/database";
type GameInfo = {
  currency: string;
  initialBalance: string;
  crossStartBonus: string;
  numberOfPlayers: number;
  gameID: number;
  playerCode: string;
  token: string;
  playerNames: string[];
};

type DbPlayersInfo = {
  [key: string]: {
      isBank: "true" | "false" | "owner";
      name: string,
      balance: number,
      status: string
  }
}

interface GameContextType {
  gameSessionActive: boolean;
  setGameSessionActive: React.Dispatch<React.SetStateAction<boolean>>;
  gameInfo: GameInfo;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
  newPlayerNames: string[];
  setNewPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
  newPlayerNamesDefined: boolean;
  setNewPlayerNamesDefined: React.Dispatch<React.SetStateAction<boolean>>;
  resetGameContext: () => void;
  dbPlayersInfo: DbPlayersInfo;
  setDbPlayersInfo: React.Dispatch<React.SetStateAction<DbPlayersInfo>>;
  updateOnlineStatus: (gameID: number, playerCode: string, status: string) => Promise<void>;
  updateBankPermissions: (gameID: number, playerCode: string, isBank: "true" | "false") => Promise<void>;
  getTransactionHistory: (gameID: number) => Promise<any>;
  updateTransactionHistory: (gameID: number, newTransactionDetails: Object) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameSessionActive, setGameSessionActive] = useState(false);

  const [gameInfo, setGameInfo] = useState<GameInfo>({
    currency: "PLN",
    initialBalance: "1500",
    crossStartBonus: "200",
    numberOfPlayers: 4,
    gameID: 0,
    playerCode: "",
    token: "",
    playerNames: [],
  });

  const [newPlayerNames, setNewPlayerNames] = useState<string[]>([]);
  const [newPlayerNamesDefined, setNewPlayerNamesDefined] = useState<boolean>(false);

  const resetGameContext = () => {
    setNewPlayerNames([]);
    setNewPlayerNamesDefined(false);
    setGameSessionActive(false);
    setGameInfo({} as GameInfo);
  };

  const updateOnlineStatus = async (gameID: number, playerCode: string, status: string) => {
      const nodeRef = ref(db, `/games/game-${gameID}/players/${playerCode}/status`);
  
      try {
          // Check if the node exists
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              // Update the status if the node exists
              await set(nodeRef, status);
              console.log(`Status updated to "${status}" for player ${playerCode} in game ${gameID}.`);
          } else {
              console.log(`Node does not exist for player ${playerCode} in game ${gameID}.`);
          }
      } catch (error) {
          console.error("Error updating online status:", error);
      }
  };

  const updateBankPermissions = async (gameID: number, playerCode: string, isBank: "true" | "false") => {
      const nodeRef = ref(db, `/games/game-${gameID}/players/${playerCode}/isBank`);
  
      try {
          // Check if the node exists
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              // Update the status if the node exists
              await set(nodeRef, isBank);
          } else {
              console.log(`isBank Node does not exist for player ${playerCode} in game ${gameID}.`);
          }
      } catch (error) {
          console.error("Error updating online status:", error);
      }
  }

  const getTransactionHistory = async (gameID: number) => {
      const nodeRef = ref(db, `/ids/${gameID}/transactionHistory`);
  
      try {
          // Check if the node exists
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              // Update the status if the node exists
              return snapshot.val();
          } else {
              console.log(`transactionHistory Node does not exist for game ${gameID}.`);
          }
      } catch (error) {
          console.error("Error updating online status:", error);
      }
  }

  const updateTransactionHistory = async (gameID: number, newTransactionDetails: Object) => {
      const nodeRef = ref(db, `/ids/${gameID}/transactionHistory`);
  
      try {
          // Check if the node exists
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              // Update with first transaction 
              const newTransactionID = snapshot.size + 1;
              await set(ref(db, `/ids/${gameID}/transactionHistory/${newTransactionID}`), {...newTransactionDetails, timestamp: serverTimestamp()});
          } else {
              console.log(`transactionHistory Node does not exist for game ${gameID}.`);
          }
      } catch (error) {
          console.error("Error updating online status:", error);
      }
  }

  const [dbPlayersInfo, setDbPlayersInfo] = useState<DbPlayersInfo>({});

  return (
    <GameContext.Provider
      value={{
        newPlayerNames,
        setNewPlayerNames,
        newPlayerNamesDefined,
        setNewPlayerNamesDefined,
        gameSessionActive,
        setGameSessionActive,
        gameInfo,
        setGameInfo,
        resetGameContext,
        dbPlayersInfo,
        setDbPlayersInfo,
        updateOnlineStatus,
        updateBankPermissions,
        getTransactionHistory,
        updateTransactionHistory
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
};

export { GameContextProvider, useGameContext };
