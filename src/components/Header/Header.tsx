import { useState } from "react";
import HeaderAppBar from "./HeaderAppBar";  
import DrawerLeft from "./DrawerLeft";

type headerTypes = {
    mode: "light" | "dark"
}

function Header({mode}: headerTypes) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsDrawerOpen(newOpen);
      };

    return (
        <>
            <HeaderAppBar onToggleDrawer={toggleDrawer}  />
            <DrawerLeft isDrawerOpen={isDrawerOpen} onToggleDrawer={toggleDrawer} mode={mode}/>
        </>
     );
}

export default Header;