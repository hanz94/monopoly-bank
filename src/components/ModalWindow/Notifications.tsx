import { useState, useEffect } from "react";
import { Badge, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Typography } from "@mui/material";
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useGameContext } from "../../contexts/GameContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../database/firebaseConfig";

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
};

function Notifications() {

    const { gameInfo, dbPlayersInfo, notifications, setNotifications, getNotifications } = useGameContext();

    const [page, setPage] = useState(0);
    const rowsPerPage = 4;

    // Fetch notifications and observe changes
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const fetchedNotifications = await getNotifications(gameInfo.playerCode);
                // Sort notifications by timestamp - desc
                fetchedNotifications.sort((a: NotificationType, b: NotificationType) => b.timestamp - a.timestamp);
                setNotifications(fetchedNotifications);
            } catch (err) {
                console.log("Error fetching notifications:", err);
            }
        };

        const notificationsRef = ref(db, `/access/${gameInfo.playerCode}/notifications`);

        //Attach listener
        const notificationsListener = onValue
        (notificationsRef, (snapshot) => {
            const fetchedNotifications = snapshot.val();
            // Sort notifications by timestamp - desc
            fetchedNotifications.sort((a: NotificationType, b: NotificationType) => b.timestamp - a.timestamp);
            setNotifications(fetchedNotifications);
        });

        fetchNotifications();

        return () => {
            notificationsListener(); //remove listener
        };

    }, []);

    const totalPages = Math.ceil(notifications.length / rowsPerPage);

    return (
        <>
        {notifications && notifications.length > 0 ? (
            <>
            <List sx={{ width: "100%", maxWidth: 360 }}>
            {notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notification: NotificationType) => (
                <ListItem key={notification.id}>
                    <ListItemAvatar>
                        <Badge
                            color="primary"
                            variant="dot"
                            overlap="circular"
                            invisible={notification.read}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Avatar>
                                {notification.type === "info" && <InfoIcon />}
                                {notification.type === "transfer-request" && <AccountBalanceWalletIcon />}
                            </Avatar>
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            notification.type === "info"
                                ? notification.textPrimary
                                : notification.type === "transfer-request"
                                ? `Prośba o przelew od ${notification.from ? dbPlayersInfo[notification.from]?.name ?? "Nieznany gracz" : "Nieznany gracz"}`
                                : ""
                        }
                        secondary={
                            notification.type === "info"
                                ? notification.textSecondary
                                : notification.type === "transfer-request"
                                ? `${notification.amount ?? "Brak kwoty"} ${gameInfo.currency} | ${
                                      notification.status === "accepted"
                                          ? "Zaakceptowana"
                                          : notification.status === "declined"
                                          ? "Odrzucona"
                                          : notification.status === "pending"
                                          ? "Oczekująca"
                                          : ""
                                  }`
                                : ""
                        }
                    />
                </ListItem>
            ))}
            </List>

            {/* Pagination Controls */}
            {notifications && notifications.length  > rowsPerPage + 1 && 
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", gap: "10px" }}>
                <IconButton onClick={() => setPage(0)} disabled={page === 0}>
                    <FirstPage />
                </IconButton>
                <IconButton onClick={() => setPage(page - 1)} disabled={page === 0}>
                    <NavigateBefore />
                </IconButton>
                <Typography>{page + 1} z {totalPages}</Typography>
                <IconButton onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= notifications.length}>
                    <NavigateNext />
                </IconButton>
                <IconButton onClick={() => setPage(totalPages - 1)} disabled={(page + 1) * rowsPerPage >= notifications.length}>
                    <LastPage />
                </IconButton>
            </div>}
            </>
            ) : (
                <Typography sx={{ mb: 0.9 }}>Brak powiadomień!</Typography>
            )
        }
        </> 
    );
}

export default Notifications;
