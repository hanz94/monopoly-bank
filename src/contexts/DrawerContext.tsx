import { createContext, useContext,  useState } from 'react';

type DrawerContextType = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (newOpen: boolean) => void;
    toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {  
        setIsDrawerOpen(!isDrawerOpen);
      }

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    )
}

const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawerContext must be used within a DrawerContextProvider');
    }
    return context;
}

export { DrawerContextProvider, useDrawerContext }