import { FormControl, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";

function DefineNewPlayers() {
    const location = useLocation();

    // Validate and throw error if `np` is not within valid bounds
    if (!location.state || !location.state.np || typeof location.state.np !== 'number' || location.state.np < 2 || location.state.np > 6) {
        throw new Error('[DefineNewPlayers] Invalid location state (np). Correct number of players must be defined.');
    }

    // Initialize playerNames with a function that generates the default names array based on `np`
    const [playerNames, setPlayerNames] = useState<string[]>(() => {
        const defaultNames = [];
        for (let i = 0; i < location.state.np; i++) {
            defaultNames.push(`Gracz ${i + 1}`);
        }
        return defaultNames;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(playerNames);
    };

    return (
        <>
            <Typography sx={{ p: 1, textAlign: 'center' }}>Hmm... to kogoś jeszcze nie znam?</Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                {playerNames.map(( _, index) => (
                    <FormControl key={index} required fullWidth>
                        <TextField
                            label={`Gracz ${index + 1}`}
                            type="text"
                            placeholder={'Pseudonim'}
                            onChange={(e) => {
                                setPlayerNames((prevNames) => {
                                    const newNames = [...prevNames];
                                    newNames[index] = e.target.value;
                                    return newNames;
                                })
                            }}
                            sx={{ my: 0.8 }} />
                    </FormControl>
                ))}

                    <FormControl fullWidth required>
                        <Button variant="contained" component={motion.button} {...scaleOnHoverSmall} sx={{ p: 1.4, mt: 1.4 }}>
                            Zapisz
                        </Button>
                    </FormControl>

            </form>
        </>
    );
}

export default DefineNewPlayers;
