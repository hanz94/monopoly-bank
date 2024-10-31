import AppLayout from './components/AppLayout';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';

function App() {

  return (
    <>
      <ThemeContextProvider>
        <ModalContextProvider>
          <AppLayout />
        </ModalContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
