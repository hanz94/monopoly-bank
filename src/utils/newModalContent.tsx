import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

    const newModalContent = {
            changeNickname: {
                title: "Wybierz pseudonim",
                content: (
                    <>
                        <h4>Witamy, <b>test</b></h4>
                        <TextField 
                            variant="standard" 
                            sx={{ mt: 2, width: "100%" }}  
                            label="Pseudonim" 
                        />
                    </>
                ),
            },
            newGame: {
                title: "Nowa gra",
                content: (
                    <>
                        <Typography>Wybierz parametry nowej gry:</Typography>
                    </>
                ),
            },
            joinGame: {
                title: "Dołącz do gry",
                content: (
                    <>
                        <Typography>Wpisz kod gracza:</Typography>
                    </>
                ),
            },
            instruction: {
                title: "Jak używać Monopoly Bank?",
                content: (
                    <>
                        <Typography>Treść instrukcji</Typography>
                    </>
                ),
            },
    };

    export default newModalContent;