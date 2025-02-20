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
  getNotifications: (playerCode: string) => Promise<any>;
  getNotification: (playerCode: string, notificationID: number) => Promise<any>;
  notifications: [];
  setNotifications: React.Dispatch<React.SetStateAction<any>>;
  updateNotification: (playerCode: string, notificationID: number, newNotification: Object) => Promise<void>;
  fetchNotification: (notificationID: number) => Promise<any>;
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
  const [notifications, setNotifications] = useState<[]>([]);

  const resetGameContext = () => {
    setNewPlayerNames([]);
    setNewPlayerNamesDefined(false);
    setGameSessionActive(false);
    setGameInfo({} as GameInfo);
    setNotifications([]);
  };

  const updateOnlineStatus = async (gameID: number, playerCode: string, status: string) => {
      const nodeRef = ref(db, `/games/game-${gameID}/players/${playerCode}/status`);
  
      try {
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              //Set new online status
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
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              //Set new isBank permission
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
          const snapshot = await get(nodeRef);
          if (snapshot.exists()) {
              //Get transaction history
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
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              const newTransactionID = snapshot.size + 1;
              //Add new transaction to history
              await set(ref(db, `/ids/${gameID}/transactionHistory/${newTransactionID}`), {...newTransactionDetails, timestamp: serverTimestamp()});
          } else {
              console.log(`transactionHistory Node does not exist for game ${gameID}.`);
          }
      } catch (error) {
          console.error("Error updating online status:", error);
      }
  }

  const getNotifications = async (playerCode: string) => {
      const nodeRef = ref(db, `/access/${playerCode}/notifications`);
  
      try {
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              //Get notifications
              return snapshot.val();
          } else {
              console.log(`Notifications Node does not exist for player ${playerCode}.`);
          }
      } catch (error) {
          console.error("Error getting notifications:", error);
      }
    }

 const getNotification = async (playerCode: string, notificationID: number) => {
      const nodeRef = ref(db, `/access/${playerCode}/notifications/${notificationID}`);

      try {
          const snapshot = await get(nodeRef);

          if (snapshot.exists()) {
              //Get notification
              return snapshot.val();
          } else {
              console.log(`NotificationID: ${notificationID} Node does not exist for player ${playerCode}.`);
          }
      }
      catch (error) {
          console.error("Error getting notification:", error);
      }
 }

  const updateNotification = async (playerCode: string, notificationID: number, newNotification: Object) => {
      const nodeRef = ref(db, `/access/${playerCode}/notifications/${notificationID}`);
  
      try {
          const snapshot = await get(nodeRef);
  
          if (snapshot.exists()) {
              //Update notification
              await set(nodeRef, newNotification);
          } else {
              console.log(`NotificationID: ${notificationID} Node does not exist for player ${playerCode}.`);
          }
      }
      catch (error) {
          console.error("Error updating notification:", error);
      }
  }

  const fetchNotification = async (notificationID: number) => {
      const nodeRef = ref(db, `/access/${gameInfo.playerCode}/notifications/${notificationID}`);

      try {
          const snapshot = await get(nodeRef);

          if (snapshot.exists()) {
              return snapshot.val();
          } else {
              console.log(`NotificationID: ${notificationID} Node does not exist for player ${gameInfo.playerCode}.`);
          }
      }
      catch (error) {
          console.error("Error updating notification:", error);
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
        updateTransactionHistory,
        getNotifications,
        getNotification,
        notifications,
        setNotifications,
        updateNotification,
        fetchNotification
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
