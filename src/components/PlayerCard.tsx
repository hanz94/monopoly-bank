function PlayerCard({playerName, playerBalance}: {playerName: string, playerBalance: number | string}) {
    return ( 
        <div>Pseudonim: {playerName} Stan konta: {playerBalance}</div>
     );
}

export default PlayerCard;