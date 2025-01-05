import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from '../../contexts/ThemeContext';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useModalContext } from '../../contexts/ModalContext';
import newModalContent from '../../utils/newModalContent';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useGameContext } from '../../contexts/GameContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useNavigate, useLocation } from 'react-router-dom';

function HeaderAppBar() {
 
  const { mode, setMode } = useThemeContext();
  const { modalOpen } = useModalContext();
  const { isDrawerOpen, toggleDrawer } = useDrawerContext();
  const { updateOnlineStatus } = useGameContext();

  const handleLogout = async (gameID: number, playerCode: string) => {
    await updateOnlineStatus(gameID, playerCode, 'offline').then(() => {
      handlePopoverClose();
      navigate('/')
    });
  }

  //Avatar popover
  const { gameInfo, dbPlayersInfo } = useGameContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'avatar-popover' : undefined;


    return (
      <>
          <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1
           }}>
            <Toolbar sx={{height: 64}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                // aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => toggleDrawer()}
              >
                {isDrawerOpen ? <ArrowBackIosNewIcon /> : <MenuIcon />}
              </IconButton>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Monopoly Bank
              </Typography>


              <Button color="inherit" onClick={() => modalOpen(newModalContent.changeNickname)}><SettingsIcon /></Button>

              <DarkModeSwitch checked={mode === 'dark'} onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')} size={24} sunColor='currentColor' moonColor='currentColor' />


              <Stack direction="row" spacing={2} sx={{ ml: 2 }} 
              onClick={handlePopoverClick}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                isOnline={location.state?.playerCode && dbPlayersInfo[location.state?.playerCode]?.status == 'online'}
              >
                <Avatar sx={{ width: 32, height: 32, cursor: 'pointer' }}>
                  {
                    dbPlayersInfo[location.state?.playerCode]?.name && 
                    dbPlayersInfo[location.state?.playerCode].name[0].toUpperCase() // get first letter of player name
                  }

                </Avatar>
                </StyledBadge>
              </Stack>

              <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              sx={{
                mt: 1
              }}
              >
                <Typography sx={{ p: 2 }}>
                  {
                    location.state?.playerCode ? 
                    //if player is in game
                    (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography>Zalogowano jako:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{dbPlayersInfo[location.state?.playerCode]?.name}</Typography>
                        <Typography>Identyfikator gry:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{location.state?.gameID}</Typography>
                        <Typography>Indywidualny kod gracza:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{location.state?.playerCode}</Typography>

                        <Typography>Aktualny stan konta:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{dbPlayersInfo[location.state?.playerCode]?.balance} {gameInfo.currency}</Typography>

                        <Typography sx={{mt: 0.8, color: dbPlayersInfo[location.state.playerCode]?.status == 'online' ? 'green' : 'red' }}>{dbPlayersInfo[location.state.playerCode]?.status.toUpperCase()}</Typography>

                        <Button 
                            variant="outlined" 
                            sx={{ p: 1.2, mt: 0.8 }} 
                            onClick={() => handleLogout(gameInfo.gameID, location.state.playerCode)}
                        >
                            Wyloguj się
                        </Button>

                      </Box>
                    ) : 
                    //if player is not in game
                    (
                      <>
                        <Typography sx={{ textAlign: 'center' }}>Niezalogowany</Typography>

                        <Button 
                          variant="outlined" 
                          sx={{ p: 1.2, mt: 0.8 }} 
                          onClick={() => modalOpen(newModalContent.joinGame)}
                        >
                          Dołącz do gry
                        </Button>
                      </>

                    )
                  }
                  
                </Typography>
              </Popover>

            </Toolbar>
          </AppBar>
      </>
     );
}

export default HeaderAppBar;