import NewGame from "../components/ModalWindow/NewGame";
import DefineNewPlayers from "../components/ModalWindow/DefineNewPlayers";
import JoinGame from "../components/ModalWindow/JoinGame";
import Instruction from "../components/ModalWindow/Instruction";
import DeleteGameConfirmation from "../components/ModalWindow/DeleteGameConfirmation";

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
            instruction: {
                title: "Jak używać Monopoly Bank?",
                content: <Instruction />
            },
            deleteGameConfirmation: {
                title: "Usuń sesję gry",
                content: <DeleteGameConfirmation />
            },
    };

    export default newModalContent;