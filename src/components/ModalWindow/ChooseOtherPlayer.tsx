import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useModalContext } from "../../contexts/ModalContext";
import { StyledBadge } from "../../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInDown, scaleOnHover } from "../../utils/animations";
import { useLocation } from "react-router-dom";
import { useGameContext } from "../../contexts/GameContext";
import ChangePlayerBalance from "./ChangePlayerBalance";

interface TargetType {
    target: 'create-transfer' | 'ask-for-transfer';
}
function ChooseOtherPlayer( {target} : TargetType ) {

    const { modalOpen } = useModalContext();

    const { gameInfo, dbPlayersInfo } = useGameContext();

    const location = useLocation();

    return ( 
        <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontSize: '1.1em', my: 0.6 }}>
                    {target == 'create-transfer' && 'Komu zlecić przelew?'}
                    {target == 'ask-for-transfer' && 'Kogo poprosić o przelew?'}
                    </Typography>
                {Object.keys(dbPlayersInfo).map((playerCode, index) => {
                    if (playerCode === location.state.playerCode) return null;
                    return <Box
                            key={index}
                            sx={{ 
                                py: 3, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)', cursor: 'pointer' } 
                            }}
                            onClick={
                                () => {
                                    if (target == 'create-transfer') {
                                        modalOpen({ 
                                            title: 'Przelew do gracza', 
                                            content: (
                                                <ChangePlayerBalance 
                                                    type='player-transfer'
                                                    playerNameTransferTarget={dbPlayersInfo[playerCode].name}  // Pass the name of the player who will receive the transfer
                                                    playerCodeTransferTarget={playerCode} // Pass the playerCode of the player who will receive the transfer
                                                    playerBalanceTransferTarget={dbPlayersInfo[playerCode].balance} // Pass the current balance of the player who will receive the transfer
                                                    gameID={gameInfo.gameID} 
                                                    playerName={dbPlayersInfo[location.state.playerCode].name} 
                                                    playerCode={location.state.playerCode} 
                                                    playerBalance={dbPlayersInfo[location.state.playerCode].balance} 
                                                    currency={gameInfo.currency} 
                                                />
                                            ) 
                                        })
                                    }
                                    else if (target == 'ask-for-transfer') {
                                        modalOpen({ 
                                            title: 'Poproś o przelew', 
                                            content: <>{playerCode}</>
                                        })
                                    }
                                }
                                
                            }
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
                    </Box>;
                })}
            </Box>
     );
}

export default ChooseOtherPlayer;