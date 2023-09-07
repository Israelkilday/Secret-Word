import React from "react";

import "./GameOver.css"

interface GameOverProps {
  retry: () => void;
  score: number;
}

const GameOver: React.FC<GameOverProps> = ({ retry, score }) => {
  return (
    <div className="containerGameOver">
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default GameOver;