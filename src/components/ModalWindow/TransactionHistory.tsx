import { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, CircularProgress } from "@mui/material";
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useGameContext } from "../../contexts/GameContext";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { ref, onValue } from "firebase/database";
import { db } from "../../database/firebaseConfig";

type TransactionType = {
    from: string;
    amount: number;
    to: string;
    timestamp: number;
};

function TransactionHistory() {

    const { mode } = useThemeContext();

    const { gameInfo, dbPlayersInfo, getTransactionHistory } = useGameContext();

    const [transactionHistory, setTransactionHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const rowsPerPage = 4;

    //fetch transaction history and observe changes
    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const history = await getTransactionHistory(gameInfo.gameID);
                // Sort transaction history by timestamp - desc
                history.sort((a: TransactionType, b: TransactionType) => b.timestamp - a.timestamp);
                setTransactionHistory(history);
            } catch (err) {
                console.log("Error fetching transaction history:", err);
            } finally {
                setLoading(false);
            }
        };
    
        const transactionHistoryRef = ref(db, `/ids/${gameInfo.gameID}/transactionHistory`);
    
        // Attach listener
        const transactionHistoryListener = onValue(transactionHistoryRef, (snapshot) => {
            if (snapshot.exists()) {
                const history = snapshot.val();
                // Sort transaction history by timestamp - desc
                history.sort((a: TransactionType, b: TransactionType) => b.timestamp - a.timestamp);
                setTransactionHistory(history);
            }
        });
    
        fetchTransactionHistory();
    
        return () => {
            transactionHistoryListener(); //remove listener
        };
    }, []);
    
    

    const totalPages = Math.ceil(transactionHistory.length / rowsPerPage);

    const tableBorder = mode === "dark" ? "1px solid #ccc" : "1px solid #aaa";

    return (
        <>
            {transactionHistory.length > 0 ? (
                <TableContainer>
                <Table sx={{ marginTop: "10px" }}>
                    <TableHead>
                        <TableRow sx={{ border: tableBorder }}>
                            <TableCell style={{ borderBottom: tableBorder }}></TableCell>
                            <TableCell style={{ borderBottom: tableBorder, textAlign: "center" }}>OD</TableCell>
                            <TableCell style={{ borderBottom: tableBorder, textAlign: "center" }}>KWOTA</TableCell>
                            <TableCell style={{ borderBottom: tableBorder, textAlign: "center" }}>DO</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction: TransactionType) => (
                            <>
                                <TableRow sx={{ border: tableBorder }}>
                                    <TableCell rowSpan={2} style={{ verticalAlign: "middle", textAlign: "center", width: "5%", border: tableBorder }}>
                                        <IconButton>
                                            {/* check if from or to is bank */}
                                            {transaction.from === 'bank' || transaction.to === 'bank' ? <AccountBalanceIcon sx={{ color: mode === 'dark' ? "white" : "black" }} /> : <PeopleIcon sx={{ color: mode === 'dark' ? "white" : "black" }} />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "130px", border: tableBorder, textAlign: "center" }}>
                                        {transaction.from === 'bank' ? <><Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <AccountBalanceIcon /><Typography sx={{ fontSize: "0.9em", mt: 0.5 }}>Bank</Typography>
                                        </Box></> : dbPlayersInfo[transaction.from]?.name}
                                    </TableCell>
                                    <TableCell style={{ border: tableBorder, textAlign: "center" }}>
                                        {transaction.amount} {gameInfo.currency}
                                    </TableCell>
                                    <TableCell style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "130px", border: tableBorder, textAlign: "center" }}>
                                        {transaction.to === 'bank' ? <><Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <AccountBalanceIcon /><Typography sx={{ fontSize: "0.9em", mt: 0.5 }}>Bank</Typography>
                                        </Box></> : dbPlayersInfo[transaction.to]?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} style={{ border: tableBorder, textAlign: "center" }}>
                                        <Typography variant="caption">{transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : "N/A"}</Typography>
                                    </TableCell>
                                </TableRow>
                                </>
                        ))}
                    </TableBody>
                </Table>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", gap: "10px" }}>
                    <IconButton onClick={() => setPage(0)} disabled={page === 0}>
                        <FirstPage />
                    </IconButton>
                    <IconButton onClick={() => setPage(page - 1)} disabled={page === 0}>
                        <NavigateBefore />
                    </IconButton>
                    <Typography>{page + 1} z {totalPages}</Typography>
                    <IconButton onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= transactionHistory.length}>
                        <NavigateNext />
                    </IconButton>
                    <IconButton onClick={() => setPage(totalPages - 1)} disabled={(page + 1) * rowsPerPage >= transactionHistory.length}>
                        <LastPage />
                    </IconButton>
                </div>
            </TableContainer>
            ) : loading ? (
                <CircularProgress />
            ) :  (
                <Typography sx={{ mb: 0.9 }}>Lista transakcji jest pusta.</Typography>
            )}
            
        </>
    );
}

export default TransactionHistory;
