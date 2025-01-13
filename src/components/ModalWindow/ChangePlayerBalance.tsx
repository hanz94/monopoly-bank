import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import { ref, set, get } from "firebase/database";
import { db } from "../../database/firebaseConfig";

interface ChangePlayerBalanceProps {
    type: 'change' | 'increase' | 'decrease';
    gameID: number | string;
    playerName: string;
    playerCode: string;
    playerBalance: number | string;
    currency: string;
}

function ChangePlayerBalance({ type, gameID, playerName, playerCode, playerBalance, currency }: ChangePlayerBalanceProps) {

    const [newPlayerBalance, setNewPlayerBalance] = useState<number | null>(null); // Allow null to track initial empty state
    const [isValid, setIsValid] = useState(false); // Tracks if the number is valid

    const { modalClose } = useModalContext();

    const validateNumber = (value: string) => {
        // Only valid if it's a non-negative number
        return /^\d+$/.test(value) && Number(value) >= 0;
    };

    const changeBalance = async (newBalance: number) => {
        if (newBalance < 0) {
            throw new Error('New balance cannot be negative.');
        }

        if (isNaN(newBalance)) {
            throw new Error('New balance must be a number.');
        }

        const balanceRef = ref(db, `games/game-${gameID}/players/${playerCode}/balance`);
    
        try {
            switch (type) {
                case 'change':
                    await set(balanceRef, Number(newBalance));
                    modalClose();
                    break;
    
                case 'increase':
                    const increaseSnapshot = await get(balanceRef);
                    if (increaseSnapshot.exists()) {
                        const currentBalance = Number(increaseSnapshot.val());
                        await set(balanceRef, currentBalance + Number(newBalance));
                    } else {
                        throw new Error("Current balance does not exist.");
                    }
                    modalClose();
                    break;
    
                case 'decrease':
                    const decreaseSnapshot = await get(balanceRef);
                    if (decreaseSnapshot.exists()) {
                        const currentBalance = Number(decreaseSnapshot.val());
                        await set(balanceRef, currentBalance - Number(newBalance));
                    } else {
                        throw new Error("Current balance does not exist.");
                    }
                    modalClose();
                    break;
    
                default:
                    throw new Error('Invalid type');
            }
        } catch (error) {
            throw new Error(`Error updating balance: ${String(error)}`);
        }
    };

    return ( 
        <>
            <Typography sx={{ textAlign: 'center' }}>
                {playerName} - {playerCode}
            </Typography>

            <Typography sx={{ mt: 1, textAlign: 'center' }}>Aktualny stan konta: <b>{playerBalance} {currency}</b></Typography>

            <TextField
                variant="standard"
                autoComplete="off"
                sx={{ mt: 2, width: "100%" }}
                label={`Kwota (${currency})`}
                value={newPlayerBalance !== null ? newPlayerBalance : ""}
                onChange={(e) => {
                    const value = e.target.value;
            
                    // Validate input
                    if (validateNumber(value)) {
                        let newValue = Number(value);
            
                        // Additional validation for decrease type - limit to current balance - to prevent negative balance
                        if (type === "decrease" && newValue > Number(playerBalance)) {
                            newValue = Number(playerBalance);
                        }
            
                        setNewPlayerBalance(newValue);
                        setIsValid(true);
                    } else {
                        setNewPlayerBalance(null);
                        setIsValid(false);
                    }
                }}
                onKeyDown={(e) => e.key === "Enter" && isValid && changeBalance(newPlayerBalance as number)}
                inputProps={{
                    style: { textTransform: "uppercase" },
                    inputMode: "numeric",
                    pattern: "\\d*", // Prevents non-numeric input
                }}
            />
            {type == 'increase' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        {playerName} otrzyma {newPlayerBalance} {currency}.
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) + Number(newPlayerBalance)} {currency}</b>
                    </Typography>
                </>
            )}

            {type == 'decrease' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        {playerName} straci {newPlayerBalance} {currency}.
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) - Number(newPlayerBalance)} {currency}</b>
                    </Typography>
                </>
            )}

            {type == 'change' && isValid && (
                <>
                    {playerBalance !== newPlayerBalance && <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        {playerName} {Number(playerBalance) > newPlayerBalance! ? 'straci' : 'otrzyma'} {Math.abs(newPlayerBalance! - Number(playerBalance))} {currency}.
                    </Typography>}
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{newPlayerBalance} {currency}</b>
                    </Typography>
                </>
            )}


            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
                sx={{ mt: 2, width: "50%" }}
                onClick={() => changeBalance(newPlayerBalance as number)}
                disabled={!isValid}
            >
                Zatwierdź
            </Button>

            <Button
                sx={{ mt: 2, width: "50%" }}
                onClick={modalClose}
            >
                Anuluj
            </Button>
            </Box>
        </>
    );
}

export default ChangePlayerBalance;
