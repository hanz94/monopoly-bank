import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { ArrowForwardIos, NavigateBefore, NavigateNext, FirstPage, LastPage } from "@mui/icons-material";

function Tutorial() {
    const [page, setPage] = useState(0);
    const totalPages = 2;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ height: 'calc(100% - 60px)', overflowY: 'auto', p: 1 }}>
                {/* TUTORIAL - PAGE 1 - INTRODUCTION */}
                {page === 0 && (
                    <>
                        <Typography sx={{ mb: 2 }}>1. Wprowadzenie</Typography>
                        <Typography sx={{ textAlign: 'justify' }}><b>Monopoly Bank</b> to nowoczesny, cyfrowy system bankowy zaprojektowany dla graczy klasycznej planszowej wersji Monopoly. Dzięki aplikacji Monopoly Bank gracze mogą zrezygnować z obiegu gotówki. Aplikacja zastępuje fizyczny pieniądz w pełni elektroniczną, działającą w czasie rzeczywistym walutą. Aplikacja jest idealna dla graczy siedzących razem w jednym pomieszczeniu i chcących sprawniej zarządzać finansami w grze Monopoly.</Typography>
                        <img
                            src={'/src/assets/meeting.png'}
                            width={100}
                            height={100}
                            className="m-4 mx-auto"
                            alt="Gracze siedzący wokół stolika"
                            draggable={false}
                        />
                    </>
                )}

                {/* TUTORIAL - PAGE 2 - FEATURES */}
                {page === 1 && (
                    <>
                        <Typography component="div" sx={{ textAlign: 'justify' }}>
                            <Typography sx={{ mb: 1 }}>2. Aplikacja <b>Monopoly Bank</b> umożliwia:</Typography>

                            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Tworzenie gier dla 2–6 graczy z własnymi ustawieniami (kwota salda początkowego, premia "Przejście przez start" oraz waluta PLN, EUR lub USD)
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Przełączanie się między zakładkami Gracz i Bank w zależności od pełnionej roli
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Wykonywanie przelewów pomiędzy graczami
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Wysyłanie próśb o przelew do innych graczy z wbudowanym systemem powiadomień
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Odbieranie premii, opłacanie podatków oraz wypłacanie bonusów bankowych
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Śledzenie sald wszystkich kont graczy w czasie rzeczywistym
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Umożliwianie innym graczom dołączania do gry za pomocą ID gry oraz indywidualnego kodu gracza, udostępnionych przez właściciela gry
                                </li>

                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <ArrowForwardIos fontSize="small" />
                                    Zarządzanie uprawnieniami: tylko właściciel gry ma dostęp do zakładki Bank oraz może w dowolnym momencie nadać do niej uprawnienia dowolnemu innemu graczowi
                                </li>
                            </ul>
                        </Typography>
                    </>
                )}
            </Box>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", gap: "10px", height: '60px', borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
                <IconButton onClick={() => setPage(0)} disabled={page === 0}>
                    <FirstPage />
                </IconButton>
                <IconButton onClick={() => setPage(page - 1)} disabled={page === 0}>
                    <NavigateBefore />
                </IconButton>
                <Typography>{page + 1} z {totalPages}</Typography>
                <IconButton onClick={() => setPage(page + 1)} disabled={(page + 1) >= totalPages}>
                    <NavigateNext />
                </IconButton>
                <IconButton onClick={() => setPage(totalPages - 1)} disabled={(page + 1) >= totalPages}>
                    <LastPage />
                </IconButton>
            </div>
        </Box>
    );
}

export default Tutorial;