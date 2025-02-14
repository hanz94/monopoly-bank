import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import DoneIcon from '@mui/icons-material/Done';
import { ref, set, get } from "firebase/database";
import { db } from "../../database/firebaseConfig";

interface ChangePlayerBalanceProps {
    type: 'bank-change' | 'bank-increase' | 'bank-decrease' | 'player-crossstartbonus' | 'player-deposit-to-bank' | 'player-withdraw-from-bank' | 'player-transfer';
    gameID: number | string;
    playerName: string;
    playerCode: string;
    playerBalance: number | string;
    currency: string;
    crossStartBonus?: number | string; // obligatory only with type: player-crossstartbonus
    playerNameTransferTarget?: string; // obligatory only with type: player-transfer
    playerCodeTransferTarget?: string; // obligatory only with type: player-transfer
    playerBalanceTransferTarget?: number | string; // obligatory only with type: player-transfer
}

function ChangePlayerBalance({ type, gameID, playerName, playerCode, playerBalance, currency, crossStartBonus, playerNameTransferTarget, playerCodeTransferTarget, playerBalanceTransferTarget }: ChangePlayerBalanceProps) {

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

        // Get the balance of the player who sends the transfer
        const balanceRef = ref(db, `games/game-${gameID}/players/${playerCode}/balance`);
    
        try {
            switch (type) {
                case 'bank-change':
                    await set(balanceRef, Number(newBalance));
                    modalClose();
                    break;
    
                case 'bank-increase':
                case 'player-withdraw-from-bank':
                case 'player-crossstartbonus':
                    const increaseSnapshot = await get(balanceRef);
                    if (increaseSnapshot.exists()) {
                        const currentBalance = Number(increaseSnapshot.val());
                        await set(balanceRef, currentBalance + Number(newBalance));
                    } else {
                        throw new Error("Current balance does not exist.");
                    }
                    modalClose();
                    break;
    
                case 'bank-decrease':
                case 'player-deposit-to-bank':
                    const decreaseSnapshot = await get(balanceRef);
                    if (decreaseSnapshot.exists()) {
                        const currentBalance = Number(decreaseSnapshot.val());
                        await set(balanceRef, currentBalance - Number(newBalance));
                    } else {
                        throw new Error("Current balance does not exist.");
                    }
                    modalClose();
                    break;
                case 'player-transfer':
                    // Get the balance of the player who receives the transfer
                    const balanceRefTransferTarget = ref(db, `games/game-${gameID}/players/${playerCodeTransferTarget}/balance`);

                    const increaseSnapshotTransfer = await get(balanceRefTransferTarget);
                    const decreaseSnapshotTransfer = await get(balanceRef);

                    if (increaseSnapshotTransfer.exists() && decreaseSnapshotTransfer.exists()) {

                        // Increase the balance of the player who receives the transfer
                        const currentBalanceReceiver = Number(increaseSnapshotTransfer.val());
                        await set(balanceRefTransferTarget, currentBalanceReceiver + Number(newBalance));

                        // Decrease the balance of the player who sends the transfer
                        const currentBalanceSender = Number(decreaseSnapshotTransfer.val());
                        await set(balanceRef, currentBalanceSender - Number(newBalance));

                    } 
                    else {
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

    // Set the fixed value for newPlayerBalance for player-crossstartbonus
    useEffect(() => {
        if (type === 'player-crossstartbonus' && crossStartBonus) {
            setNewPlayerBalance(Number(crossStartBonus));
            setIsValid(true);
        }
    }, []);

    return ( 
        <>
            {/* Player details info */}
            <Typography sx={{ textAlign: 'center' }}>
                <b>{playerName}</b>&nbsp;({playerCode})
            </Typography>

            {/* Current player balance info */}
            <Typography sx={{ mt: 1, textAlign: 'center' }}>Aktualny stan konta: <b>{playerBalance}&nbsp;{currency}</b></Typography>

            {/* Target Player details info (the player who receives the transfer from this player) */}
            {type == 'player-transfer' && playerCodeTransferTarget && (
                <Typography sx={{ mt: 1.9, textAlign: 'center' }}>Przelew do gracza: <b>{playerNameTransferTarget}</b>&nbsp;({playerCodeTransferTarget})</Typography>
            )}

            {/* Target player balance info (the player who receives the transfer from this player) */}
            {/* {type == 'player-transfer' && playerCodeTransferTarget && (
                <Typography sx={{ mt: 1, textAlign: 'center' }}>Aktualny stan konta odbiorcy: <b>{playerBalanceTransferTarget}&nbsp;{currency}</b></Typography>    
            )} */}

            {/* New Player Balance input for bank and player transfers */}
            {(type == 'bank-increase' || type == 'bank-decrease' || type == 'bank-change' || type == 'player-deposit-to-bank' || type == 'player-withdraw-from-bank' || type == 'player-transfer') && (
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
                
                            // Additional validation for bank-decrease, player-deposit-to-bank and player-transfer type - limit to current balance - to prevent negative balance
                            if ((type === "bank-decrease" || type === "player-deposit-to-bank" || type === "player-transfer") && newValue > Number(playerBalance)) {
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
            )}

            {/* Cross Start Bonus value info */}
            {type == 'player-crossstartbonus' && crossStartBonus && (
                <Typography sx={{ mt: 1, textAlign: 'center' }}>Dodatek "Przejście przez start" wynosi: <b>{crossStartBonus}&nbsp;{currency}</b></Typography>
            )}

            {/* New account balance info */}
            {type == 'bank-increase' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        <b>{playerName}</b> otrzyma <b>{newPlayerBalance}&nbsp;{currency}</b>.
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) + Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography>
                </>
            )}

            {type == 'bank-decrease' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                    <b>{playerName}</b> straci <b>{newPlayerBalance}&nbsp;{currency}</b>.
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) - Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography>
                </>
            )}

            {type == 'bank-change' && isValid && (
                <>
                    {playerBalance !== newPlayerBalance && <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        <b>{playerName}</b> {Number(playerBalance) > newPlayerBalance! ? 'straci' : 'otrzyma'} <b>{Math.abs(newPlayerBalance! - Number(playerBalance))}&nbsp;{currency}</b>.
                    </Typography>}
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{newPlayerBalance}&nbsp;{currency}</b>
                    </Typography>
                </>
            )}

            {type == 'player-deposit-to-bank' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Wpłacasz do banku <b>{newPlayerBalance}&nbsp;{currency}</b>.
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) - Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Czy jesteś pewien, że chcesz dokonać wpłaty?
                    </Typography>
                </>
            )}

            {type == 'player-withdraw-from-bank' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Wypłacasz z banku <b>{newPlayerBalance}&nbsp;{currency}</b>.
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) + Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Czy jesteś pewien, że chcesz dokonać wypłaty?
                    </Typography>
                </>
            )}

            {type == 'player-crossstartbonus' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta: <b>{Number(playerBalance) + Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Czy jesteś pewien, że chcesz pobrać dodatek "Przejście przez start"?
                    </Typography>
                </>
            )}

            {type == 'player-transfer' && isValid && (
                <>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        <b>{playerNameTransferTarget}</b> otrzyma <b>{newPlayerBalance}&nbsp;{currency}</b>.
                    </Typography>
                    {/* <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Nowy stan konta odbiorcy: <b>{Number(playerBalanceTransferTarget) + Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography> */}
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Pozostała kwota do wydania: <b>{Number(playerBalance) - Number(newPlayerBalance)}&nbsp;{currency}</b>
                    </Typography>
                    <Typography sx={{ mt: 1.8, textAlign: 'center' }}>
                        Czy jesteś pewien, że chcesz dokonać przelewu? 
                    </Typography>
                </>
            )}

            {/* Buttons: Accept / Decline */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
                variant="outlined"
                sx={{
                    mt: 2,
                    width: '46%',
                    textTransform: 'none', // Keep text casing as is

                  }}
                startIcon={<DoneIcon />}
                onClick={() => changeBalance(newPlayerBalance as number)}
                disabled={!isValid}
            >
                Zatwierdź
            </Button>

            <Button
                variant="outlined"
                sx={{
                    mt: 2,
                    width: '46%',
                    textTransform: 'none', // Keep text casing as is
                  }}
                onClick={modalClose}
            >
                Anuluj
            </Button>
            </Box>
        </>
    );
}

export default ChangePlayerBalance;
