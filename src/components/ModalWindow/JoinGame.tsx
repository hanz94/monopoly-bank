import { useState } from "react";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";

function JoinGame() {
    const [playerGameCode, setPlayerGameCode] = useState("");
    const [error, setError] = useState(""); // Track validation error

    //Font size for error messages
    const errorFontSize = 12;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that the code is exactly 6 characters
        if (playerGameCode.length !== 6) {
            setError("Kod musi mieć 6 znaków.");
            return;
        }

        setError(""); // Clear any existing error
        console.log(playerGameCode); // Code is valid, proceed with the form submission
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase(); // Convert input to uppercase
        const sanitizedInput = input.replace(/[^A-Z0-9]/g, ""); // Allow only uppercase letters and numbers
        setPlayerGameCode(sanitizedInput);
        if (sanitizedInput.length === 6) setError(""); // Clear error if length is 6
    };

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            variant="standard"
                            sx={{ mt: 2, width: "100%" }}
                            label="Indywidualny kod gracza"
                            value={playerGameCode}
                            onChange={handleInputChange}
                            inputProps={{
                                maxLength: 6, // Maximum length of 6 characters
                                style: { textTransform: "uppercase" },
                            }}
                            error={!!error} // Show error styling if error exists
                        />
                        {error && <Typography sx={{fontSize: errorFontSize}} color="error">{error}</Typography>}
                    </Grid>
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
