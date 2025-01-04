import { createContext, useContext, useState } from 'react';

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
