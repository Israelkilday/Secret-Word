import React from "react";

import { useState, useRef } from "react";

import "./Game.css"

interface GameProps {
  verifyLetter: (letter: string) => void,
  pickedCategory: string,
  pickedWord: string,
  letters: string[],
  guessedLetters: string[],
  wrongLetters: string[],
  guesses: number,
  score: number,
  usedWords: string[]
}

const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  usedWords
}: GameProps) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedLetter = letter.toLowerCase();

    if (!usedWords.includes(pickedWord.toLowerCase())) {
      verifyLetter(normalizedLetter);
      setLetter("");
      letterInputRef.current?.focus();
    } 
  }

  return (
    <div className="game">
      <p className="points">
        Pontuação:
        <span> {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já ultilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game;



