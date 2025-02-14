import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import { StyledBadge } from '../../contexts/ThemeContext';
import { useModalContext } from "../../contexts/ModalContext";
import ChangePlayerBalance from '../ModalWindow/ChangePlayerBalance';
import ChooseOtherPlayer from '../ModalWindow/ChooseOtherPlayer';
import { useGameContext } from "../../contexts/GameContext";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInDown, scaleOnHover } from "../../utils/animations";
import GameSessionHandler from '../../database/GameSessionHandler';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
import CallIcon from '@mui/icons-material/Call';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

function Player() {

    const { modalOpen } = useModalContext();

    const { gameInfo, dbPlayersInfo } = useGameContext();
    
    const location = useLocation();

    const playerBalance = dbPlayersInfo[location.state.playerCode]?.balance;
    
    return ( 
        <>
            <GameSessionHandler />

            {/* Welcome + your name */}
            <Typography variant="h5">Witaj {dbPlayersInfo[location.state.playerCode]?.name}!</Typography>

            {/* Your account balance */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">Twoje konto:</Typography>
                <AnimatePresence mode="wait">
                    {playerBalance !== undefined && playerBalance !== null ? (
                        <Typography
                        variant="h4"
                        component={motion.div}
                        key={playerBalance}
                        {...scaleOnHover}
                        {...fadeInDown}
                        >
                        {playerBalance} {gameInfo.currency}
                        </Typography>
                    ) : (
                        <CircularProgress /> // Show loading icon if balance is not available
                    )}
                </AnimatePresence>
            </Box>

            {/* Inline Action Panel */}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, textAlign: 'center' }}>
                <Button 
                    variant="contained" 
                    component={motion.button} 
                    {...scaleOnHover} 
                    sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2 }} 
                    onClick={() => modalOpen({
                        title: 'Nowy przelew',
                        content: <ChooseOtherPlayer target="create-transfer" />,
                    })}
                >
                    <PaymentsIcon sx={{ mr: 1, fontSize: '1.6em' }} />
                    Nowy przelew
                </Button>
                <Button 
                    variant="contained"
                    component={motion.button} 
                    {...scaleOnHover} 
                    sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2 }} 
                    onClick={() => modalOpen({
                        title: 'Poproś o przelew',
                        content: <ChooseOtherPlayer target="ask-for-transfer" />,
                    })}
                >
                    <CallIcon sx={{ mr: 1, fontSize: '1.6em' }} />
                    Poproś o przelew
                </Button>
            </Box>
            
            <Box sx={{ mt: 0.5, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, textAlign: 'center' }}>
                <Button 
                    variant="contained" 
                    component={motion.button} 
                    {...scaleOnHover} 
                    sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2, mx: 0 }} 
                    onClick={() =>
                        modalOpen({
                            title: 'Bonus - wypłata z banku',
                            content: <ChangePlayerBalance type="player-withdraw-from-bank" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={playerBalance} currency={gameInfo.currency} />,
                        })
                    }
                >
                    <AttachMoneyIcon sx={{ mr: 1, fontSize: '1.6em' }} />
                    Bonus
                </Button>
                <Button 
                    variant="contained" 
                    component={motion.button} 
                    {...scaleOnHover} 
                    sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2, mx: 0 }} 
                    onClick={() =>
                        modalOpen({
                            title: 'Podatek - wpłata do banku',
                            content: <ChangePlayerBalance type="player-deposit-to-bank" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={playerBalance} currency={gameInfo.currency} />,
                        })
                    }
                >
                    <MoneyOffIcon sx={{ mr: 1, fontSize: '1.6em' }} />
                    Podatek
                </Button>
                <Button 
                    variant="contained" 
                    component={motion.button} 
                    {...scaleOnHover} 
                    sx={{ p: 1.4, margin: 'auto', display: 'block', mt: 2 }} 
                    onClick={() =>
                        modalOpen({
                            title: 'Przejście przez start',
                            content: <ChangePlayerBalance type="player-crossstartbonus" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={playerBalance} currency={gameInfo.currency} crossStartBonus={gameInfo.crossStartBonus} />,
                        })
                    }
                >
                    <AddBusinessIcon sx={{ mr: 1, fontSize: '1.6em' }} />
                    Przejście przez start
                </Button>
            </Box>

            {/* Other players list */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                {/* <Typography variant="h6">Inni gracze:</Typography> */}
                {Object.keys(dbPlayersInfo).map((playerCode, index) => {
                    if (playerCode === location.state.playerCode) return null;
                    return <Box
                    key={index}
                    sx={{ 
                        py: 2, 
                        display: 'flex', 
                        justifyContent: 'center', 
                    }}
                    // onClick={
                    //     () => {
                            
                    //     }
                        
                    // }
                    {...scaleOnHover}
                >

                        <Stack direction="row" spacing={2} sx={{ mr: 1, my: 'auto' }}>
                            <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            isOnline={dbPlayersInfo[playerCode].status == 'online'}
                        >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                    {dbPlayersInfo[playerCode].name.charAt(0).toUpperCase()}
                                </Avatar>
                            </StyledBadge>
                        </Stack>
                        <Box sx={{ display: 'flex' }}>
                            <Typography 
                            sx={{ my: 'auto', ml: 1.2, mr: 0.8, textAlign: 'left', fontSize: 17 }}>{dbPlayersInfo[playerCode].name}</Typography>
                            <AnimatePresence mode="wait">
                                <Typography
                                sx={{ my: 'auto', ml: 0.95, textAlign: 'left', fontSize: 12, fontWeight: 'bold' }}
                                component={motion.div}
                                key={dbPlayersInfo[playerCode].balance}
                                {...fadeInDown} 
                                >{dbPlayersInfo[playerCode].balance} {gameInfo.currency}</Typography>
                            </AnimatePresence>
                        </Box>
            </Box>;;
                })}
            </Box>
        </>
     );
}

export default Player;