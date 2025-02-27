import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import newModalContent from '../../utils/newModalContent';
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from 'framer-motion';
import { bounce, scaleOnHover } from '../../utils/animations';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useModalContext } from '../../contexts/ModalContext';
import { useGameContext } from '../../contexts/GameContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../../database/firebaseConfig';

function MainPage() {
    const { mode } = useThemeContext();
    const { modalOpen } = useModalContext();
    const { resetGameContext } = useGameContext();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        auth.languageCode = 'en';
        signInWithPopup(auth, provider).then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        const user = result.user;
        
        console.log('credential: ', credential)
        console.log('token: ', token);
        console.log('user: ', user);
        });
    }

    //reset game context and watch for auth changes
    useEffect(() => {
        resetGameContext();

        const unsub = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
          });

        return () => unsub();
    }, []);

    return (
        <>

            {mode === 'dark' ? (
                <motion.img 
                    src={'/src/assets/m-logo-white.png'} 
                    className="m-4" 
                    alt="logo"
                    draggable={false}
                    {...bounce} 
                    {...scaleOnHover} 
                />
            ) : (
                <motion.img 
                    src={'/src/assets/m-logo-black.png'} 
                    className="m-4" 
                    alt="logo"
                    draggable={false}
                    {...bounce} 
                    {...scaleOnHover} 
                />
            )}

            <div className="text-center">
                <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>
                    Monopoly Bank
                </Typography>
                <Typography sx={{ px: 1.4, mb: 6 }}>
                    Nowy bezgotówkowy system płatności w Monopoly!
                </Typography>

                <Grid container spacing={{ xs: 2, sm: 0 }}>
                    <Grid size={{xs: 12, sm: 3.5}}>
                        <Button 
                            variant="contained" 
                            component={motion.button} 
                            {...scaleOnHover} 
                            sx={{ p: 1.4 }} 
                            onClick={() => modalOpen(newModalContent.newGame)}
                        >
                            Nowa gra
                        </Button>
                    </Grid>
                    <Grid size={{xs: 12, sm: 5}}>
                        <Button 
                            variant="contained" 
                            component={motion.button} 
                            {...scaleOnHover} 
                            sx={{ p: 1.4 }} 
                            onClick={() => modalOpen(newModalContent.joinGame)}
                        >
                            Dołącz do gry
                        </Button>
                    </Grid>
                    <Grid size={{xs: 12, sm: 3.5}}>
                        <Button 
                            variant="contained" 
                            component={motion.button} 
                            {...scaleOnHover} 
                            sx={{ p: 1.4 }} 
                            onClick={() => modalOpen(newModalContent.instruction)}
                        >
                            Instrukcja
                        </Button>
                    </Grid> 
                </Grid>

                {isLoggedIn ? (
                    <>
                    <Typography sx={{ mt: 3 }}>Zalogowano jako: {auth.currentUser?.displayName}</Typography>
                    <Typography sx={{ mt: 3 }}>Email: {auth.currentUser?.email}</Typography>
                    <Button 
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        component={motion.button}   
                        {...scaleOnHover} 
                        sx={{ p: 1.4, mt: 3, textTransform: 'none' }} 
                        onClick={() => auth.signOut()}
                    >
                        Wyloguj się
                    </Button>
                    </>
                ) : (
                    <Button 
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        component={motion.button} 
                        {...scaleOnHover} 
                        sx={{ p: 1.4, mt: 3, textTransform: 'none' }} 
                        onClick={handleGoogleLogin}
                    >
                        Zaloguj się przez Google
                    </Button>
                )}
            </div>
        </>
    );
}

export default MainPage;
