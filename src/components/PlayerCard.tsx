import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { IsPlayerBankSwitch } from "../contexts/ThemeContext";
import { useModalContext } from "../contexts/ModalContext";
import { useGameContext } from "../contexts/GameContext";
import { useLocation } from "react-router-dom";
import ChangePlayerBalance from "./ModalWindow/ChangePlayerBalance";
import ShiningText from "shiny-text";

interface PlayerCardProps {
    currency: string;
    gameID: number | string;
    playerCode: string;
    playerName: string;
    playerBalance: number | string;
    playerStatus: string;
    playerIsBank: 'owner' | 'true' | 'false';
}

function PlayerCard({ currency, gameID, playerCode, playerName, playerBalance, playerStatus, playerIsBank }: PlayerCardProps) {

    const { modalOpen } = useModalContext();
    const { dbPlayersInfo, updateBankPermissions } = useGameContext();

    const [isPlayerBankChecked, setIsPlayerBankChecked] = useState(playerIsBank === 'true')

    const location = useLocation();

    const bankSwitchHandler = () => {
        setIsPlayerBankChecked(!isPlayerBankChecked)
        updateBankPermissions(Number(gameID), playerCode, isPlayerBankChecked ? 'false' : 'true')
    }

    //watch for bank permission changes
    useEffect(() => {
        // setIsPlayerBankChecked(playerIsBank === 'true')
        if (dbPlayersInfo[playerCode].isBank === 'true') setIsPlayerBankChecked(true)
        else if (dbPlayersInfo[playerCode].isBank === 'false') setIsPlayerBankChecked(false)
    }, [dbPlayersInfo[playerCode].isBank])
    
    return ( 
        <>
            <Box> 

            <Typography>Identyfikator gry: <b>{gameID}</b> </Typography>
            <Typography>Indywidualny kod gracza: <b>{playerCode}</b> </Typography>

                <Box sx={{ mt: 0.5 }}>
                    <ShiningText 
                    duration="5s" 
                    textColor={playerStatus === 'online' ? '#66bb6a' : 'red'}
                    >
                    {playerStatus.toLocaleUpperCase()}
                    </ShiningText>
                </Box>

                <Box sx={{ mt: 0.5, mb: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {playerIsBank === 'owner' && <Typography sx={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.9em' }}>Właściciel</Typography>}
                    {(playerIsBank === 'true' || playerIsBank === 'false') && playerCode !== location.state?.playerCode &&
                        <IsPlayerBankSwitch 
                            checked={isPlayerBankChecked}
                            isChecked={isPlayerBankChecked}
                            onChange={bankSwitchHandler}
                        />             
                    }
                </Box>

            </Box>

            <Box sx={{ mb: 0.7 }}>

                <Button 
                variant="outlined"
                sx={{display: 'inline', mr: 1}} 
                onClick={() =>
                    modalOpen({
                        title: 'Zmniejsz stan konta',
                        content: <ChangePlayerBalance type="bank-decrease" gameID={gameID} playerName={playerName} playerCode={playerCode} playerBalance={playerBalance} currency={currency} />,
                    })
                }
                >
                    Zmniejsz {currency}
                </Button>
                <Button 
                variant="outlined"
                sx={{display: 'inline', mr: 1}} 
                onClick={() =>
                    modalOpen({
                        title: 'Zwiększ stan konta',
                        content: <ChangePlayerBalance type="bank-increase" gameID={gameID} playerName={playerName} playerCode={playerCode} playerBalance={playerBalance} currency={currency} />,
                    })
                }
                >
                    Zwiększ {currency}
                </Button>
            </Box>

            <Button
            variant="outlined"
            sx={{ display: 'inline', mr: 1 }}
            onClick={() =>
                modalOpen({
                    title: 'Zmień stan konta',
                    content: <ChangePlayerBalance type="bank-change" gameID={gameID} playerName={playerName} playerCode={playerCode} playerBalance={playerBalance} currency={currency} />,
                })
            }
            >
                Zmień stan konta
            </Button>

        </>
    );
}

export default PlayerCard;
