import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useDrawerContext } from '../../contexts/DrawerContext';


export default function DrawerLeft() {

const {mode, toggleTheme} = useThemeContext();
const {isDrawerOpen, setIsDrawerOpen} = useDrawerContext();

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={() => setIsDrawerOpen(false)}>
      <List>
        {['Przelew do banku', 'Wypłata z banku', 'Przelew do gracza', 'Poproś o przelew'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ml: 1}}>
                {index === 0 ? <MoneyOffIcon /> : null}
                {index === 1 ? <AttachMoneyIcon /> : null}
                {index === 2 ? <PaymentsIcon /> : null}
                {index === 3 ? <AddIcCallIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Powiadomienia'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ml: 1}}>
              {index === 0 ? <NotificationsIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

          <ListItem key={"Tryb wyświetlania"} disablePadding>
            <ListItemButton onClick={() => toggleTheme()}>
              <ListItemIcon sx={{ml: 1}}>
              <DarkModeSwitch checked={mode === "dark"} size={24} sunColor='currentColor' moonColor='currentColor'/>
              </ListItemIcon>
              <ListItemText primary={mode === "dark" ? "Tryb jasny" : "Tryb ciemny"} />
            </ListItemButton>
          </ListItem>


      </List>
    </Box>
  );

  return (
    <>
      <SwipeableDrawer sx={{
    '& .MuiDrawer-root': {
        position: 'absolute',
    },
    '& .MuiPaper-root': {
        position: 'absolute',
        top: 64
    },
  }} open={isDrawerOpen} onOpen={() => setIsDrawerOpen(true)} onClose={() => setIsDrawerOpen(false)} disableBackdropTransition={true} swipeAreaWidth={55}>
        {DrawerList}
      </SwipeableDrawer>
    </>
  );
}