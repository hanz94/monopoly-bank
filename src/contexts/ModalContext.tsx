import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    currentModalContent: { title: string; content: JSX.Element };
    setCurrentModalContent: (content: { title: string; content: JSX.Element }) => void;
    modalOpen: (content: { title: string; content: JSX.Element }) => void;
    modalClose: () => void;
  }

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentModalContent, setCurrentModalContent] = useState({
        title: "",
        content: <></>,
    });

    const modalOpen = (content: { title: string; content: JSX.Element }) => {
        if (content?.title && content?.content) {
            setCurrentModalContent(content);
            setModalOpen(true);
        }
    }

    const modalClose = () => setModalOpen(false);

  return <ModalContext.Provider value={{isModalOpen, setModalOpen, currentModalContent, setCurrentModalContent, modalOpen, modalClose}}>{children}</ModalContext.Provider>;
}

const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalContextProvider');
    }
    return context;
}

export { ModalContextProvider, useModalContext }