import { Box, Button, Typography } from "@mui/material";
import { deleteGame } from "../../database/deleteGame";
import { useModalContext } from "../../contexts/ModalContext";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
                variant="outlined"
                startIcon={<DeleteOutlineIcon />}
                sx={{
                    mt: 2,
                    width: '46%',
                    textTransform: 'none', // Keep text casing as is
                  }}
                onClick={async () => await deleteGame(location.state.gameID).then(() =>  {
                    navigate('/')
                    modalClose()
                })}
                >
                    Usuń grę
                </Button>

                <Button 
                variant="outlined"
                sx={{
                    mt: 2,
                    width: '46%',
                    textTransform: 'none', // Keep text casing as is
                  }}
                onClick={modalClose}
                >
                    Anuluj
                </Button>
            </Box>
        </>
     );
}

export default DeleteGameConfirmation;