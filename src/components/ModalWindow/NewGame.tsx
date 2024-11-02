import { Typography, FormControl, Select, TextField, InputLabel, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";


function NewGame() {
    return ( 
        <>
            <Typography className="text-center" sx={{mb: 2, fontSize: 18}}>Wprowadź parametry nowej gry:</Typography>

            <Grid container spacing={2}>
                <Grid size={12}>
                    <FormControl fullWidth required>
                    <InputLabel id="label-waluta">Waluta</InputLabel>
                    <Select
                        labelId="label-waluta"
                        label="Waluta"
                        defaultValue={"PLN"}
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
                            defaultValue={1500}
                            inputProps={{ min: 1, max: 10000 }}
                        />
                    </FormControl>
                </Grid>
                <Grid size={12}>
                <FormControl fullWidth required>
                        <TextField
                            label='Dodatek "Przejście przez START" (0-1000) *'
                            type="number"
                            defaultValue={200}
                            inputProps={{ min: 0, max: 1000 }}
                        />
                    </FormControl>
                </Grid>
                <Grid size={12}>
                <FormControl fullWidth required>
                    <InputLabel id="label-playercount">Ilość graczy (2-6)</InputLabel>
                    <Select
                        labelId="label-playercount"
                        label="Ilość graczy (2-6)"
                        defaultValue={4}
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

        </>
     );
}

export default NewGame;