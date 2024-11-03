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


function AppLayout() {
    const { isModalOpen, modalClose, currentModalContent } = useModalContext();

    return ( 
    <>

        <Box className="flex flex-col justify-center items-center height-full-mobile-support">

          <Header />
          
          <Paper elevation={0} className='flex flex-col justify-center items-center' sx={{height: '100%', width: '100%'}} square>
            <Box className="flex flex-col justify-center items-center" sx={{mt: -5}}>

            <BrowserRouter>

            <ModalWindow open={isModalOpen} onClose={modalClose} modalContent={currentModalContent} />

              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/new" element={<New />} />
                <Route path="/join" element={<Join />} />
                <Route path="/404" element={<NoPage />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>

            </Box>
          </Paper>
        </Box> 
    </>
        
    );
}

export default AppLayout;