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
import CallIcon from '@mui/icons-material/Call';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useLocation } from "react-router-dom";
import { useModalContext } from '../../contexts/ModalContext';
import { useGameContext } from '../../contexts/GameContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useDrawerContext } from '../../contexts/DrawerContext';
import ChooseOtherPlayer from '../ModalWindow/ChooseOtherPlayer';
import ChangePlayerBalance from '../ModalWindow/ChangePlayerBalance';
import Notifications from '../ModalWindow/Notifications';
import TransactionHistory from '../ModalWindow/TransactionHistory';


export default function DrawerLeft() {
  const { mode, toggleTheme } = useThemeContext();
  const { isDrawerOpen, setIsDrawerOpen } = useDrawerContext();
  const { modalOpen } = useModalContext();
  const { gameInfo, dbPlayersInfo } = useGameContext();
  const location = useLocation();
  const playerBalance = dbPlayersInfo[location.state?.playerCode]?.balance;

    const menuItems = [
      { text: 'Nowy przelew', icon: <PaymentsIcon />, action: () => modalOpen({ title: 'Nowy przelew', content: <ChooseOtherPlayer target="create-transfer" /> }) },
      { text: 'Poproś o przelew', icon: <CallIcon />, action: () => modalOpen({
        title: 'Poproś o przelew',
        content: <ChooseOtherPlayer target="ask-for-transfer" />,
    }) },
      { text: 'Bonus', icon: <AttachMoneyIcon />, action: () => modalOpen({
        title: 'Bonus - wypłata z banku',
        content: <ChangePlayerBalance type="player-withdraw-from-bank" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={playerBalance} currency={gameInfo.currency} />,
    }) },
      { text: 'Podatek', icon: <MoneyOffIcon />, action: () => modalOpen({
        title: 'Podatek - wpłata do banku',
        content: <ChangePlayerBalance type="player-deposit-to-bank" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={playerBalance} currency={gameInfo.currency} />,
    }) },
      { text: 'Przejście przez start', icon: <AddBusinessIcon />, action: () => modalOpen({
        title: 'Przejście przez start',
        content: <ChangePlayerBalance type="player-crossstartbonus" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={playerBalance} currency={gameInfo.currency} crossStartBonus={gameInfo.crossStartBonus} />,
    })},
    ];


  return (
    <SwipeableDrawer
      sx={{
        '& .MuiDrawer-root': { position: 'absolute' },
        '& .MuiPaper-root': { position: 'absolute', top: 64 },
      }}
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
      disableBackdropTransition={true}
      swipeAreaWidth={55}
    >
      <Box sx={{ width: 250 }}>
        {dbPlayersInfo[location.state?.playerCode]?.name &&
        (<>
          <List>
            {menuItems.map(({ text, icon, action }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    action();
                    setIsDrawerOpen(false);
                  }}
                >
                  <ListItemIcon sx={{ ml: 1 }}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>)}

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => modalOpen({ title: 'Powiadomienia', content: <Notifications /> })}>
              <ListItemIcon sx={{ ml: 1 }}>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Powiadomienia" />
            </ListItemButton>
          </ListItem>
          {dbPlayersInfo[location.state?.playerCode]?.name && (
            <ListItem disablePadding>
            <ListItemButton
              onClick={() => modalOpen({ title: 'Historia transakcji', content: <TransactionHistory /> })}>
              <ListItemIcon sx={{ ml: 1 }}>
                <ManageSearchIcon />
              </ListItemIcon>
              <ListItemText primary="Historia transakcji" />
            </ListItemButton>
          </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon sx={{ ml: 1 }}>
                <DarkModeSwitch checked={mode === 'dark'} size={24} sunColor="currentColor" moonColor="currentColor" />
              </ListItemIcon>
              <ListItemText primary={mode === 'dark' ? 'Tryb jasny' : 'Tryb ciemny'} />
            </ListItemButton>
          </ListItem>
        </List>

      </Box>
    </SwipeableDrawer>
  );
}
