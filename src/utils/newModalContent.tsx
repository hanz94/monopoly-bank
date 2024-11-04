import ChangeNickname from "../components/ModalWindow/ChangeNickname";
import NewGame from "../components/ModalWindow/NewGame";
import DefineNewPlayers from "../components/ModalWindow/DefineNewPlayers";
import JoinGame from "../components/ModalWindow/JoinGame";
import Instruction from "../components/ModalWindow/Instruction";

    const newModalContent = {
            changeNickname: {
                title: "Wybierz pseudonim",
                content: <ChangeNickname />
            },
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
    };

    export default newModalContent;