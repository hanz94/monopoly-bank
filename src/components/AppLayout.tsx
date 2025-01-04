import '../App.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './Header/Header';
import ModalWindow from './ModalWindow/ModalWindow';
import { useModalContext } from '../contexts/ModalContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './Pages/MainPage';
import NoPage from './Pages/NoPage';
import Join from './Pages/Join';
import New from './Pages/New';
import Bank from './Pages/Bank';
import SessionExpired from './Pages/SessionExpired';


function AppLayout() {
    const { isModalOpen, modalClose, currentModalContent } = useModalContext();

    return ( 
    <>
          <Header />
          
          <Paper elevation={0} sx={{ width: '100%', height: 'calc(100% - 64px)', overflow: 'auto', position: 'fixed', top: 64, display: 'grid', placeItems: 'center' }} square>
            <Box className="flex flex-col justify-center items-center" sx={{ margin: 'auto' }}>

            <BrowserRouter>

              <ModalWindow open={isModalOpen} onClose={modalClose} modalContent={currentModalContent} />

              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/new" element={<New />} />
                <Route path="/join" element={<Join />} />
                <Route path="/bank" element={<Bank />} />
                <Route path="/session-expired" element={<SessionExpired />} />
                <Route path="/404" element={<NoPage />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>

            </Box>
          </Paper>
    </>
        
    );
}

export default AppLayout;