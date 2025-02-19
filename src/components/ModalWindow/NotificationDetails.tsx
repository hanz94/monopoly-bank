import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useModalContext } from "../../contexts/ModalContext";
import { useGameContext } from "../../contexts/GameContext";
import Notifications from "../ModalWindow/Notifications";

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
    const { fetchNotification } = useGameContext();
    const [notification, setNotification] = useState<NotificationType | null>(null);

    //fetch notification based on notificationID
    useEffect(() => {
        let isMounted = true; // Prevents state update if the component unmounts

        fetchNotification(notificationID)
            .then((notification) => {
                if (isMounted) {
                    setNotification(notification);
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
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1.4, fontSize: '1.12em' }}>
                        {notification.textPrimary}
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>
                        {notification.textSecondary}
                    </Typography>
                </Box>
            ) : (
                <CircularProgress />
            )}

            <Button
            sx={{ mt: 2, width: '100%' }}
            onClick={() => {
                modalOpen({ title: 'Powiadomienia', content: <Notifications /> });
            }}>
                Powrót do powiadomień
            </Button>
        </>
     );
}

export default NotificationDetails;