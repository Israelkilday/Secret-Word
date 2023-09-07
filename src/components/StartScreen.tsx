import React from "react";

import "./StartScreen.css"

interface StartScreenProps {
    startGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ startGame }) => {
    return (

        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={startGame}>Começar o jogo</button>
        </div>

    )
}

export default StartScreen;