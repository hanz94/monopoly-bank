import AppLayout from './components/AppLayout';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {

  return (
    <>
      <ThemeContextProvider>
        <AppLayout />
      </ThemeContextProvider>
    </>
  );
}

export default App;
