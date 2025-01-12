import { Box, Button, Typography } from "@mui/material";
import { deleteGame } from "../../database/deleteGame";
import { useModalContext } from "../../contexts/ModalContext";
import { useNavigate, useLocation } from "react-router-dom";

function DeleteGameConfirmation() {

    const { modalClose } = useModalContext();

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ mb: 2, fontSize: 17 }}>Czy na pewno chcesz usunąć sesję gry?</Typography>
                <Typography><b>Uwaga!</b> Dane gry zostaną trwale usunięte oraz wszyscy gracze zostaną wylogowani.</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                sx={{ mt: 2, width: '50%' }}
                onClick={async () => await deleteGame(location.state.gameID).then(() =>  {
                    navigate('/')
                    modalClose()
                })}
                >
                    Usuń sesję
                </Button>

                <Button 
                sx={{ mt: 2, width: '50%' }}
                onClick={modalClose}
                >
                    Anuluj
                </Button>
            </Box>
        </>
     );
}

export default DeleteGameConfirmation;