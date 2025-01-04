import { FormControl, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useModalContext } from "../../contexts/ModalContext";
import { useGameContext } from "../../contexts/GameContext";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";

function DefineNewPlayers() {

    const { newPlayerNames, setNewPlayerNames, setNewPlayerNamesDefined } = useGameContext();
    const { modalClose } = useModalContext();
    const location = useLocation();

    // Validate and throw error if `np` is not within valid bounds
    if (!location.state || !location.state.np || typeof location.state.np !== 'number' || location.state.np < 2 || location.state.np > 6) {
        throw new Error('[DefineNewPlayers] Invalid location state (np). Correct number of players must be defined.');
    }
    
    const [errors, setErrors] = useState<string[]>(Array(location.state.np).fill(""));

    const validatePlayerName = (name: string) => {
        if (name.length > 20) {
            return "Długość pseudonimu nie może przekraczać 20 znaków.";
        }
        if (!/^[a-zA-Z0-9 ]*$/.test(name)) {
            return "Wykryto niedozwolone znaki.";
        }
        return "";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const value = e.target.value;

        // Update player name
        setNewPlayerNames((prevNames: string[]) => {
            const newNames = [...prevNames];
            newNames[index] = value;
            return newNames;
        });

        // Validate and update errors
        setErrors((prevErrors: string[]) => {
            const newErrors = [...prevErrors];
            newErrors[index] = validatePlayerName(value);
            return newErrors;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check for any remaining errors
        const validationErrors = newPlayerNames.map(validatePlayerName);
        setErrors(validationErrors);

        // If no errors, proceed with form submission
        if (validationErrors.every((error) => error === "")) {
            setNewPlayerNamesDefined(true);
            modalClose();
        }
    };

    return (
        <>
            <Typography sx={{ p: 1, textAlign: 'center' }}>Hmm... to kogoś jeszcze nie znam?</Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                {newPlayerNames.map((_, index) => (
                    <FormControl key={index} required fullWidth sx={{ my: 0.8 }}>
                        <TextField
                            label={`Gracz ${index + 1}`}
                            type="text"
                            placeholder="Pseudonim"
                            onChange={(e) => handleInputChange(e, index)}
                            inputProps={{
                                maxLength: 20,
                            }}
                            error={!!errors[index]}
                            helperText={errors[index]}
                        />
                    </FormControl>
                ))}

                <FormControl fullWidth>
                    <Button
                        type="submit"
                        variant="contained"
                        component={motion.button}
                        {...scaleOnHoverSmall}
                        sx={{ p: 1.4, mt: 1.4 }}
                    >
                        Zapisz
                    </Button>
                </FormControl>
            </form>
        </>
    );
}

export default DefineNewPlayers;
