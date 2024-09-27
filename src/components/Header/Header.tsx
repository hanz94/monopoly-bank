import { useState } from "react";
import HeaderAppBar from "./HeaderAppBar";  
import DrawerLeft from "./DrawerLeft";

type headerTypes = {
    mode: "light" | "dark"
    setMode: (mode: "light" | "dark") => void
    isModalOpen: boolean
    setModalOpen: (newModalOpen: boolean) => void
}

function Header({mode, setMode, isModalOpen, setModalOpen}: headerTypes) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsDrawerOpen(newOpen);
      };

    return (
        <>
            <HeaderAppBar isDrawerOpen={isDrawerOpen} onToggleDrawer={toggleDrawer} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
            <DrawerLeft isDrawerOpen={isDrawerOpen} onToggleDrawer={toggleDrawer} mode={mode} setMode={setMode} />
        </>
     );
}

export default Header;