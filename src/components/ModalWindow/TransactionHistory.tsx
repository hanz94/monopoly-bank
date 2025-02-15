import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from "@mui/material";
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';

function TransactionHistory() {
    const exampleHistory = [
        { id: 1, from: "Alice", to: "Bob", amount: 1000, timestamp: new Date().toLocaleString() },
        { id: 2, from: "Charlie", to: "Dave", amount: 500, timestamp: new Date().toLocaleString() },
        { id: 3, from: "Eve", to: "Frank", amount: 750, timestamp: new Date().toLocaleString() },
        { id: 4, from: "Grace", to: "Hank", amount: 200, timestamp: new Date().toLocaleString() },
        { id: 5, from: "Ivy", to: "Jack", amount: 900, timestamp: new Date().toLocaleString() },
        { id: 6, from: "Kevin", to: "Laura", amount: 1200, timestamp: new Date().toLocaleString() },
        { id: 7, from: "Mike", to: "Nancy", amount: 300, timestamp: new Date().toLocaleString() },
    ];

    const [page, setPage] = useState(0);
    const rowsPerPage = 4;
    const totalPages = Math.ceil(exampleHistory.length / rowsPerPage);

    return (
        <TableContainer>
            <Table sx={{ marginTop: "10px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "5%", borderBottom: "1px solid #ccc" }}></TableCell>
                        <TableCell style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}>OD</TableCell>
                        <TableCell style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}>KWOTA</TableCell>
                        <TableCell style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}>DO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exampleHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                        <>
                            <TableRow key={transaction.id} sx={{ border: "1px solid #ccc" }}>
                                <TableCell rowSpan={2} style={{ verticalAlign: "middle", textAlign: "center", width: "5%", border: "1px solid #ccc" }}>
                                    <IconButton>
                                        <PeopleIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "130px", border: "1px solid #ccc", textAlign: "center" }}>{transaction.from}</TableCell>
                                <TableCell style={{ border: "1px solid #ccc", textAlign: "center" }}>${transaction.amount}</TableCell>
                                <TableCell style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "130px", border: "1px solid #ccc", textAlign: "center" }}>{transaction.to}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} style={{ border: "1px solid #ccc", textAlign: "center" }}>
                                    <Typography variant="caption">{transaction.timestamp}</Typography>
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
                <IconButton onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= exampleHistory.length}>
                    <NavigateNext />
                </IconButton>
                <IconButton onClick={() => setPage(totalPages - 1)} disabled={(page + 1) * rowsPerPage >= exampleHistory.length}>
                    <LastPage />
                </IconButton>
            </div>
        </TableContainer>
    );
}

export default TransactionHistory;
