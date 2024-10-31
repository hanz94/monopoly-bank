import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useModalContext } from '../../contexts/ModalContext';
import modalContent from '../../utils/modalContent';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function HeaderAppBar() {
 
  const { mode, setMode } = useThemeContext();
  const { modalOpen } = useModalContext();
  const { isDrawerOpen, toggleDrawer } = useDrawerContext();

    return (
      <>
          <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1
           }}>
            <Toolbar sx={{height: 64}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => toggleDrawer()}
              >
                {isDrawerOpen ? <ArrowBackIosNewIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Monopoly Bank
              </Typography>
              <Button color="inherit" onClick={() => modalOpen(modalContent.changeNicknameContent)}><SettingsIcon /></Button>
              <DarkModeSwitch checked={mode === 'dark'} onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')} size={24} sunColor='currentColor' moonColor='currentColor'/>
            </Toolbar>
          </AppBar>
      </>
     );
}

export default HeaderAppBar;