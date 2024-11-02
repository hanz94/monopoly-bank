import { useState } from "react";
import { Typography, FormControl, Select, TextField, InputLabel, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";


function NewGame() {

    const [currency, setCurrency] = useState("PLN");
    const [initialBalance, setInitialBalance] = useState(1500);
    const [crossStartBonus, setCrossStartBonus] = useState(200);
    const [numberOfPlayers, setNumberOfPlayers] = useState(4);

    const handleSubmit = (e: any) => {  
        e.preventDefault();
        console.log(currency, initialBalance, crossStartBonus, numberOfPlayers);
    }

    return ( 
        <>
            <Typography className="text-center" sx={{mb: 2, fontSize: 18}}>Wprowadź parametry nowej gry:</Typography>

            <form autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <FormControl fullWidth required>
                        <InputLabel id="label-waluta">Waluta</InputLabel>
                        <Select
                            labelId="label-waluta"
                            label="Waluta"
                            defaultValue={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="PLN">PLN</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth required>
                            <TextField
                                label="Początkowy stan konta gracza (1-10000) *"
                                type="number"
                                defaultValue={initialBalance}
                                inputProps={{ min: 1, max: 10000 }}
                                onChange={(e) => setInitialBalance(Number(e.target.value))}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                    <FormControl fullWidth required>
                            <TextField
                                label='Dodatek "Przejście przez START" (0-1000) *'
                                type="number"
                                defaultValue={crossStartBonus}
                                inputProps={{ min: 0, max: 1000 }}
                                onChange={(e) => setCrossStartBonus(Number(e.target.value))}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="label-playercount">Ilość graczy (2-6)</InputLabel>
                        <Select
                            labelId="label-playercount"
                            label="Ilość graczy (2-6)"
                            defaultValue={numberOfPlayers}
                            onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
                        >
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth required>
                            <Button variant="contained" component={motion.button} {...scaleOnHoverSmall} sx={{p: 1.4}}>Stwórz grę</Button>
                        </FormControl>
                    </Grid>
                </Grid>

            </form>

        </>
     );
}

export default NewGame;