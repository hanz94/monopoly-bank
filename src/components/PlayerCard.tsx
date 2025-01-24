import { Typography, Button, Box } from "@mui/material";
import { useModalContext } from "../contexts/ModalContext";
import ChangePlayerBalance from "./ModalWindow/ChangePlayerBalance";
import ShiningText from "shiny-text";

function PlayerCard({currency, gameID, playerCode, playerName, playerBalance, playerStatus }: { currency: string, gameID: number | string, playerName: string, playerCode: string, playerBalance: number | string, playerStatus: string }) {

    const { modalOpen } = useModalContext();

    return ( 
        <>
            <Box> 

            <Typography>Identyfikator gry: <b>{gameID}</b> </Typography>
            <Typography>Indywidualny kod gracza: <b>{playerCode}</b> </Typography>

                <Box sx={{ mt: 0.5, mb: 0.7 }}>
                    <ShiningText 
                    duration="5s" 
                    textColor={playerStatus === 'online' ? '#66bb6a' : 'red'}
                    >
                    {playerStatus.toLocaleUpperCase()}
                    </ShiningText>
                </Box>

            </Box>

            <Box sx={{ mb: 0.7 }}>

                <Button 
                variant="outlined"
                sx={{display: 'inline', mr: 1}} 
                onClick={() =>
                    modalOpen({
                        title: 'Zmniejsz stan konta',
                        content: <ChangePlayerBalance type="decrease" gameID={gameID} playerName={playerName} playerCode={playerCode} playerBalance={playerBalance} currency={currency} />,
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
                        content: <ChangePlayerBalance type="increase" gameID={gameID} playerName={playerName} playerCode={playerCode} playerBalance={playerBalance} currency={currency} />,
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
                    content: <ChangePlayerBalance type="change" gameID={gameID} playerName={playerName} playerCode={playerCode} playerBalance={playerBalance} currency={currency} />,
                })
            }
            >
                Zmień stan konta
            </Button>

        </>
    );
}

export default PlayerCard;
