import { Button, Typography } from "@mui/material";
import { useModalContext } from "../../contexts/ModalContext";
import Notifications from "../ModalWindow/Notifications";

function NotificationDetails({notificationID}: {notificationID: number}) {

    const { modalOpen } = useModalContext();

    return (
        <>
            <Typography sx={{ textAlign: 'center' }}>
                Szczegóły powiadomienia
            </Typography>

            <Typography sx={{ textAlign: 'center' }}>
                ID: {notificationID}
            </Typography>

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