import { Typography, Button, Box } from "@mui/material";
import { useModalContext } from "../contexts/ModalContext";
import ChangePlayerBalance from "./ModalWindow/ChangePlayerBalance";

function PlayerCard({currency, gameID, playerCode, playerName, playerBalance, playerStatus }: { currency: string, gameID: number | string, playerName: string, playerCode: string, playerBalance: number | string, playerStatus: string }) {

    const { modalOpen } = useModalContext();

    return ( 
        <>
            <div> 
            <Typography>Identyfikator gry: <b>{gameID}</b> </Typography>
            <Typography>Indywidualny kod gracza: <b>{playerCode}</b> </Typography>

                <Typography sx ={{ my: 0.6 }} color={playerStatus === 'online' ? 'success' : 'error'}>{playerStatus.toLocaleUpperCase()}</Typography>
                </div>
            <Box sx={{ mb: 0.7 }}>
                <Button 
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
