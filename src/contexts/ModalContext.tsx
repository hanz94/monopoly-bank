import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    modalContent: { title: string; content: JSX.Element };
    setModalContent: (content: { title: string; content: JSX.Element }) => void;
    modalOpen: (content: { title: string; content: JSX.Element }) => void;
    modalClose: () => void;
  }

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        content: <></>,
    });

    const modalOpen = (content: { title: string; content: JSX.Element }) => {
        if (content?.title && content?.content) {
            setModalContent(content);
            setModalOpen(true);
        }
    }

    const modalClose = () => setModalOpen(false);

  return <ModalContext.Provider value={{isModalOpen, setModalOpen, modalContent, setModalContent, modalOpen, modalClose}}>{children}</ModalContext.Provider>;
}

const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalContextProvider');
    }
    return context;
}

export { ModalContextProvider, useModalContext }