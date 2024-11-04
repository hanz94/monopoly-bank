import AppLayout from './components/AppLayout';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';
import { DrawerContextProvider } from './contexts/DrawerContext';
import { GameContextProvider } from './contexts/GameContext';

function App() {

  return (
    <>
      <ThemeContextProvider>
        <GameContextProvider>
          <DrawerContextProvider>
            <ModalContextProvider>
              <AppLayout />
            </ModalContextProvider>
          </DrawerContextProvider>
        </GameContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
