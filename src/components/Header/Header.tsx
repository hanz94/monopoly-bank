import { useState } from "react";
import HeaderAppBar from "./HeaderAppBar";  
import DrawerLeft from "./DrawerLeft";

function Header() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsDrawerOpen(newOpen);
      };

    return (
        <>
            <HeaderAppBar onToggleDrawer={toggleDrawer} />
            <DrawerLeft isDrawerOpen={isDrawerOpen} onToggleDrawer={toggleDrawer} />
        </>
     );
}

export default Header;