import { useState } from "react";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useModalContext } from "../../contexts/ModalContext";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { db } from "../../database/firebaseConfig";
import { child, get, ref, set } from "firebase/database";

function JoinGame() {

    const navigate = useNavigate();
    const { modalClose } = useModalContext();

    const [gameID, setGameID] = useState("");
    const [playerGameCode, setPlayerGameCode] = useState("");
    const [errorGameID, setErrorGameID] = useState("");
    const [errorPlayerGameCode, setErrorPlayerGameCode] = useState("");
    const [errorDb, setErrorDb] = useState("");

    //Font size for error messages
    const errorFontSize = 12;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that the gameID is exactly 6 digits
        if (gameID.length !== 6 || isNaN(parseInt(gameID))) {
            setErrorGameID("Identyfikator musi zawierać 6 cyfr.");
            return;
        }

        // Validate that the playerGameCode is exactly 6 characters
        if (playerGameCode.length !== 6) {
            setErrorPlayerGameCode("Kod musi zawierać 6 znaków.");
            return;
        }

        //Check if gameID and playerCode are valid
        try {
            const snapshot = await get(child(ref(db), `access/${playerGameCode}/gameID`));
            
            if (snapshot.exists() && snapshot.val() == gameID) {
                setErrorDb("");
            } else {
                setErrorDb("Nie znaleziono identyfikatora gry lub kodu gracza. Sprawdź poprawność danych.");
                console.log(snapshot.val());
                return;
            }
        } catch (error) {
            console.error(error);
            setErrorDb("Błąd łączenia z bazą danych. Spróbuj ponownie później.");
            return; 
        }

        // Clear any existing error
        setErrorGameID("");
        setErrorPlayerGameCode(""); 

        //create new token
        const newToken = uuidv4();

        //set token in database
        try {
            await set(ref(db, `access/${playerGameCode}/token`), newToken);
        } catch (error) {
            console.error("Error setting token:", error);
            setErrorDb("Błąd zapisu tokenu. Spróbuj ponownie później.");
            return;
        }

        // ID and code are valid, new token is ready, proceed with the form submission
        navigate("/bank", { state: { gameID: gameID, playerCode: playerGameCode, token: newToken } });
        modalClose();
    };

    const handleInputGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedInput = e.target.value.replace(/[^0-9]/g, "").slice(0, 6); // Only numbers
        setGameID(sanitizedInput);
        if (sanitizedInput.length === 6) setErrorGameID("");
        setErrorDb("");
    };

    const handleInputPlayerCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase(); // Convert to uppercase
        const sanitizedInput = input.replace(/[^A-Z0-9]/g, "").slice(0, 6); // Only uppercase letters and numbers
        setPlayerGameCode(sanitizedInput);
        if (sanitizedInput.length === 6) setErrorPlayerGameCode("");
        setErrorDb("");
    };

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            variant="standard"
                            type="number"
                            sx={{ width: "100%" }}
                            label="Identyfikator gry"
                            value={gameID}
                            onChange={handleInputGameIDChange}
                            inputProps={{
                                maxLength: 6, // Maximum length of 6 characters
                            }}
                            error={!!errorGameID} // Show error styling if error exists
                        />
                        {errorGameID && <Typography sx={{fontSize: errorFontSize}} color="error">{errorGameID}</Typography>}
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            variant="standard"
                            sx={{ mt: 2, width: "100%" }}
                            label="Indywidualny kod gracza"
                            value={playerGameCode}
                            onChange={handleInputPlayerCodeChange}
                            inputProps={{
                                maxLength: 6, // Maximum length of 6 characters
                                style: { textTransform: "uppercase" },
                            }}
                            error={!!errorPlayerGameCode} // Show error styling if error exists
                        />
                        {errorPlayerGameCode && <Typography sx={{fontSize: errorFontSize}} color="error">{errorPlayerGameCode}</Typography>}
                    </Grid>

                    {errorDb && 
                    <Typography sx={{fontSize: errorFontSize}} color="error">{errorDb}
                    </Typography>}

                    <Grid size={12}>
                        <FormControl fullWidth required>
                            <Button
                                variant="contained"
                                component={motion.button}
                                {...scaleOnHoverSmall}
                                sx={{ p: 1.4 }}
                            >
                                Dołącz
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default JoinGame;
