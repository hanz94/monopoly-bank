import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type DrawerLeftProps = {
  isDrawerOpen: boolean;
  onToggleDrawer: (isDrawerOpen: boolean) => () => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

export default function DrawerLeft( {isDrawerOpen, onToggleDrawer, mode, setMode}: DrawerLeftProps ) {

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={onToggleDrawer(false)}>
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
            <ListItemButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
              <ListItemIcon sx={{ml: 1}}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />} 
              </ListItemIcon>
              <ListItemText primary={mode === "dark" ? "Tryb jasny" : "Tryb ciemny"} />
            </ListItemButton>
          </ListItem>


      </List>
    </Box>
  );

  return (
    <>
      <Drawer sx={{
    '& .MuiDrawer-root': {
        position: 'absolute',
    },
    '& .MuiPaper-root': {
        position: 'absolute',
        top: 64
    },
  }} open={isDrawerOpen} onClose={onToggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}