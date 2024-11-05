import { createContext, useContext, useState } from 'react';

type GameInfo = {
  currency: string;
  initialBalance: string;
  crossStartBonus: string;
  numberOfPlayers: number;
  playerNamesArray: string[];
};

interface GameContextType {
  gameSessionActive: boolean;
  setGameSessionActive: React.Dispatch<React.SetStateAction<boolean>>;
  gameInfo: GameInfo;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
  playerNames: string[];
  setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
  playerNamesDefined: boolean;
  setPlayerNamesDefined: React.Dispatch<React.SetStateAction<boolean>>;
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
    playerNamesArray: [],
  });

  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerNamesDefined, setPlayerNamesDefined] = useState<boolean>(false);

  const resetGameContext = () => {
    setPlayerNames([]);
    setPlayerNamesDefined(false);
    setGameSessionActive(false);
    setGameInfo({} as GameInfo);
  };

  return (
    <GameContext.Provider
      value={{
        playerNames,
        setPlayerNames,
        playerNamesDefined,
        setPlayerNamesDefined,
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
