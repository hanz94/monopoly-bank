import { useState } from "react";
import HeaderAppBar from "./HeaderAppBar";  
import DrawerLeft from "./DrawerLeft";

type headerTypes = {
    mode: "light" | "dark"
    setMode: (mode: "light" | "dark") => void
    modals: any
}

function Header({mode, setMode, modals}: headerTypes) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsDrawerOpen(newOpen);
      };

    return (
        <>
            <HeaderAppBar isDrawerOpen={isDrawerOpen} onToggleDrawer={toggleDrawer} modals={modals} />
            <DrawerLeft isDrawerOpen={isDrawerOpen} onToggleDrawer={toggleDrawer} mode={mode} setMode={setMode} />
        </>
     );
}

export default Header;