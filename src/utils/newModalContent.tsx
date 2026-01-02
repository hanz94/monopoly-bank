import NewGame from "../components/ModalWindow/NewGame";
import DefineNewPlayers from "../components/ModalWindow/DefineNewPlayers";
import JoinGame from "../components/ModalWindow/JoinGame";
import Tutorial from "../components/ModalWindow/Tutorial";
import TransactionHistory from "../components/ModalWindow/TransactionHistory";
import DeleteGameConfirmation from "../components/ModalWindow/DeleteGameConfirmation";
import Notifications from "../components/ModalWindow/Notifications";

const newModalContent = {
    newGame: {
        title: "Nowa gra",
        content: <NewGame />
    },
    defineNewPlayers: {
        title: "Wprowadź nowych graczy",
        content: <DefineNewPlayers />
    },
    joinGame: {
        title: "Dołącz do gry",
        content: <JoinGame />
    },
    tutorial: {
        title: "Samouczek",
        content: <Tutorial />,
        //enable custom scroll - for long content, setting 100% height for modal content (falls back to 80vh), enabling custom scroll management for modal content
        enableCustomScroll: true
    },
    notifications: {
        title: "Powiadomienia",
        content: <Notifications />,
    },
    transactionHistory: {
        title: "Historia transakcji",
        content: <TransactionHistory />,
        //enable custom scroll - for long content, setting 100% height for modal content (falls back to 80vh), enabling custom scroll management for modal content
        enableCustomScroll: true
    },
    deleteGameConfirmation: {
        title: "Usuń sesję gry",
        content: <DeleteGameConfirmation />
    },
};

export default newModalContent;