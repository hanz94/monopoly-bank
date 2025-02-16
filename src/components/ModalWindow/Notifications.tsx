import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useGameContext } from "../../contexts/GameContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const exampleNotifications = [
  { id: 1, type: "info", textPrimary: "Witamy w grze!", textSecondary: "Rozpoczynasz grę z kwotą 1500 PLN.", timestamp: 11, read: false },
  { id: 2, type: "transfer-request", from: "Gracz 1", amount: 100, timestamp: 11, status: "pending", read: false }
];

function Notifications() {

    const { gameInfo } = useGameContext();

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {exampleNotifications.map((notification) => (
        <ListItem key={notification.id}>
          <ListItemAvatar>
            <Avatar>
              {notification.type === "info" && <InfoIcon />}
              {notification.type === "transfer-request" && <AccountBalanceWalletIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
                notification.type === "info"
                ? notification.textPrimary
                : notification.type === "transfer-request"
                ? `Prośba o przelew od ${notification.from}`
                : ""
            }
            secondary={
                notification.type === "info"
                ? notification.textSecondary
                : notification.type === "transfer-request"
                ? `Kwota: ${notification.amount} ${gameInfo.currency} | ${
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
  );
}

export default Notifications;
