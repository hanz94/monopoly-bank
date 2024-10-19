import { useState } from 'react';
import { TextField } from "@mui/material";

const useModals = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        content: <></>,
    });

    const modals = {
        contents: {
            emptyContent: {
                title: "",
                content: <></>,
            },
            changeNicknameContent: {
                title: "Wybierz pseudonim",
                content: (
                    <>
                        <h4>Witamy, <b>test</b></h4>
                        <TextField 
                            variant="standard" 
                            sx={{ mt: 2, width: "100%" }}  
                            label="Pseudonim" 
                        />
                    </>
                ),
            },
        },
        isModalOpen,
        setModalOpen,
        modalContent,
        setModalContent,
        open: (content: { title: string; content: JSX.Element }) => {
            if (content?.title && content?.content) {
                setModalContent(content);
                setModalOpen(true);
            }
        },
        close: () => setModalOpen(false),
    };

    return modals;
};

export default useModals;
