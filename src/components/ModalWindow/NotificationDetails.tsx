import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useModalContext } from "../../contexts/ModalContext";
import { useGameContext } from "../../contexts/GameContext";
import Notifications from "../ModalWindow/Notifications";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ChangePlayerBalance from "./ChangePlayerBalance";
import { useLocation } from "react-router-dom";

type NotificationType = {
    id: number;
    type: "info" | "transfer-request";
    textPrimary?: string;
    textSecondary?: string;
    from?: string;
    amount?: number;
    status?: "pending" | "accepted" | "declined";
    timestamp: number;
    read: boolean;
}

function NotificationDetails({notificationID}: {notificationID: number}) {

    const { modalOpen } = useModalContext();
    const { gameInfo, dbPlayersInfo, fetchNotification } = useGameContext();

    const location = useLocation();

    const [notification, setNotification] = useState<NotificationType | null>(null);

    //fetch notification based on notificationID
    useEffect(() => {
        let isMounted = true; // Prevents state update if the component unmounts

        fetchNotification(notificationID)
            .then((notification) => {
                if (isMounted) {
                    setNotification(notification);

                    //redirect to ChangePlayerBalance if notification type is "transfer-request"
                    if (notification.type === "transfer-request") {
                        modalOpen({ title: `Powiadomienie #${notification.id}`, content: <ChangePlayerBalance type="transfer-request-decision" gameID={gameInfo.gameID} playerName={dbPlayersInfo[location.state.playerCode]?.name} playerCode={location.state.playerCode} playerBalance={dbPlayersInfo[location.state.playerCode]?.balance} currency={gameInfo.currency} playerNameTransferTarget={dbPlayersInfo[notification.from]?.name} playerCodeTransferTarget={notification.from} playerBalanceTransferTarget={dbPlayersInfo[notification.from]?.balance} transferRequestAmount={notification.amount} /> });
                    }
                }
            })
            .catch((error) => console.error("Error fetching notification:", error));

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
        {notification && Object.keys(notification).length > 0 ? (
                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ textAlign: 'center', mb: 1.4, fontSize: '1.12em' }}>
                        {notification.textPrimary}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: '.96em' }}>
                        {notification.textSecondary}
                    </Typography>
                </Box>
            ) : (
                <CircularProgress />
            )}

            <Button
            sx={{ mt: 2, width: '100%' }}
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => {
                modalOpen({ title: 'Powiadomienia', content: <Notifications /> });
            }}>
                Powrót do powiadomień
            </Button>
        </>
     );
}

export default NotificationDetails;