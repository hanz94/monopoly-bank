import { TextField } from "@mui/material";

function ChangeNickname() {
    return ( 
        <>
            <h4>Witamy, <b>test</b></h4>
            <TextField 
                variant="standard" 
                sx={{ mt: 2, width: "100%" }}  
                label="Pseudonim" 
            />
        </>
     );
}

export default ChangeNickname;