import AppLayout from './components/AppLayout';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';
import { DrawerContextProvider } from './contexts/DrawerContext';

function App() {

  return (
    <>
      <ThemeContextProvider>
        <DrawerContextProvider>
          <ModalContextProvider>
            <AppLayout />
          </ModalContextProvider>
        </DrawerContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
