import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type HeaderAppBarProps = {
  onToggleDrawer: (isDrawerOpen: boolean) => () => void
}
function HeaderAppBar( {onToggleDrawer} : HeaderAppBarProps ) {
    return (
      <>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={onToggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Monopoly Tool
              </Typography>
              <Button color="inherit">Wybierz pseudonim</Button>
            </Toolbar>
          </AppBar>
      </>
     );
}

export default HeaderAppBar;