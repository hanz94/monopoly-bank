import { useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";

function JoinGame() {

    const [playerGameCode, setPlayerGameCode] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(playerGameCode);
    }

    return ( 
        <>

            <form autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField 
                                variant="standard" 
                                sx={{ mt: 2, width: "100%" }}  
                                label="Indywidualny kod gracza"
                                inputProps={{ maxLength: 6, style: {textTransform: "uppercase" }}}
                                onChange={(e) => setPlayerGameCode(e.target.value)}
                            />
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth required>
                                <Button variant="contained" component={motion.button} {...scaleOnHoverSmall} sx={{p: 1.4}}>Dołącz</Button>
                            </FormControl>
                        </Grid>
                </Grid>

            </form>

        </>
     );
}

export default JoinGame;