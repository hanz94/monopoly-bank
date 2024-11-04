import { createContext, useContext, useState } from 'react';

interface GameContextType {
    playerNames: string[];
    setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
    playerNamesDefined: boolean;
    setPlayerNamesDefined: React.Dispatch<React.SetStateAction<boolean>>
  }

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [playerNamesDefined, setPlayerNamesDefined] = useState<boolean>(false);

  return <GameContext.Provider value={{playerNames, setPlayerNames, playerNamesDefined, setPlayerNamesDefined}}>{children}</GameContext.Provider>;
}

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
};

export { GameContextProvider, useGameContext }