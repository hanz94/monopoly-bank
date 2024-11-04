import { useState } from "react";
import { Typography, FormControl, Select, TextField, InputLabel, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useModalContext } from "../../contexts/ModalContext";
import { motion } from "framer-motion";
import { scaleOnHoverSmall } from "../../utils/animations";
import { useNavigate, useLocation } from "react-router-dom";

type Errors = {
    currency?: string;
    initialBalance?: string;
    crossStartBonus?: string;
    numberOfPlayers?: string;
};

function NewGame() {

    const navigate = useNavigate();
    const location = useLocation();
    const { modalClose } = useModalContext();

    const [currency, setCurrency] = useState(() => location.state?.cr || "PLN");
    const [initialBalance, setInitialBalance] = useState<string>(() => location.state?.ib || "1500"); // Allow empty input with string type
    const [crossStartBonus, setCrossStartBonus] = useState<string>(() => location.state?.csb || "200"); // Allow empty input with string type
    const [numberOfPlayers, setNumberOfPlayers] = useState(() => location.state?.np || 4);
    const [errors, setErrors] = useState<Errors>({});

    const validateForm = () => {
        const newErrors: Errors = {};

        // Validate currency
        if (!["PLN", "EUR", "USD"].includes(currency)) {
            newErrors.currency = "Nieprawidłowa waluta.";
        }

        // Validate initial balance (allow empty, but check if not empty)
        if (initialBalance === "" || Number(initialBalance) < 1 || Number(initialBalance) > 10000) {
            newErrors.initialBalance = "Wprowadź wartość pomiędzy 1 a 10000.";
        }

        // Validate cross start bonus (allow empty, but check if not empty)
        if (crossStartBonus === "" || Number(crossStartBonus) < 0 || Number(crossStartBonus) > 1000) {
            newErrors.crossStartBonus = "Wprowadź wartość pomiędzy 0 a 1000.";
        }

        // Validate number of players
        if (numberOfPlayers < 2 || numberOfPlayers > 6) {
            newErrors.numberOfPlayers = "Nieprawidłowa liczba graczy.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Font size for error messages
    const errorFontSize = 12;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            navigate("/new", { state: { cr: currency, ib: initialBalance, csb: crossStartBonus, np: numberOfPlayers } });
            modalClose();
        }
    };

    return (
        <>
            <Typography className="text-center" sx={{ mb: 2, fontSize: 18 }}>
                Wprowadź parametry nowej gry:
            </Typography>

            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <FormControl fullWidth required error={!!errors.currency}>
                            <InputLabel id="label-waluta">Waluta</InputLabel>
                            <Select
                                labelId="label-waluta"
                                label="Waluta"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <MenuItem value="PLN">PLN</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </Select>
                            {errors.currency && <Typography sx={{fontSize: errorFontSize}} color="error">{errors.currency}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth required error={!!errors.initialBalance}>
                            <TextField
                                label="Początkowy stan konta gracza (1-10000) *"
                                type="number"
                                value={initialBalance}
                                onChange={(e) => {
                                    // Allow empty value, but remove leading zeroes if present
                                    const value = e.target.value.replace(/^0+(?=\d)/, "");
                                    setInitialBalance(value);
                                }}
                            />
                            {errors.initialBalance && <Typography sx={{fontSize: errorFontSize}} color="error">{errors.initialBalance}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth required error={!!errors.crossStartBonus}>
                            <TextField
                                label='Dodatek "Przejście przez START" (0-1000) *'
                                type="number"
                                value={crossStartBonus}
                                onChange={(e) => {
                                    // Allow empty value, but remove leading zeroes if present
                                    const value = e.target.value.replace(/^0+(?=\d)/, "");
                                    setCrossStartBonus(value);
                                }}
                            />
                            {errors.crossStartBonus && <Typography sx={{fontSize: errorFontSize}} color="error">{errors.crossStartBonus}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth required error={!!errors.numberOfPlayers}>
                            <InputLabel id="label-playercount">Ilość graczy (2-6)</InputLabel>
                            <Select
                                labelId="label-playercount"
                                label="Ilość graczy (2-6)"
                                value={numberOfPlayers}
                                onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
                            >
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                            </Select>
                            {errors.numberOfPlayers && <Typography sx={{fontSize: errorFontSize}} color="error">{errors.numberOfPlayers}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth required>
                            <Button variant="contained" component={motion.button} {...scaleOnHoverSmall} sx={{ p: 1.4 }}>
                                Stwórz grę
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default NewGame;
