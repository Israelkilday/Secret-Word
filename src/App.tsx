import React from 'react';
// hooks
import { useCallback, useEffect, useState } from 'react';
// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';
// data
import { wordsList } from "./data/words";
// css
import './App.css'

interface Wordcategory {
  [key: string]: string[];
}

interface Stage {
  id: number;
  name: string;
}

const stages: Stage[] = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const guesesQty: number = 5;

function App() {
  const [score, setScore] = useState<number>(0);
  const [gameStage, setGameStage] = useState<string>(stages[0].name);
  const [words] = useState<Wordcategory>(wordsList);

  const [pickedWord, setPickedWord] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(5);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const pickWordAndCategory = useCallback(() => {
    // pick a randon category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // check that all words have already been used
    const categoryWords = words[category];
    const unusedWords = categoryWords.filter(word => !usedWords.includes(word));

    if (unusedWords.length === 0) {
      // all words have been used so redefine the used words array
      setUsedWords([]);
    }

    // chose an unused word user from the category
    const wordIndex = Math.floor(Math.random() * unusedWords.length)
    const word = unusedWords[wordIndex];

    return { word, category };
  }, [words, usedWords]);

  // start the secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();

    const { category, word } = pickWordAndCategory();

    // create array of letters
    let wordletters = word.split("");
    wordletters =
      wordletters.map((firstLetter) => firstLetter.toLowerCase());

    // fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordletters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // process the letter input
  const verifyLetter = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been ultilized
    if (guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }

    // push guessed letter or remove a guess 
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // clear letter state
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // check if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      // reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses])

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];


    // check win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      if (gameStage === stages[1].name) {
        setScore((actualScore) => actualScore += 100);
      }
      // restart game with new word
      startGame();
    }

  }, [guessedLetters, letters, startGame]);

  // restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guesesQty);
    setGameStage(stages[0].name);
  }

  return (
    <>
      <div className='App'>
        {gameStage === "start" && < StartScreen startGame={startGame} />}
        {gameStage === "game" && (
          < Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
            usedWords={usedWords}
          />
        )}
        {gameStage === "end" &&
          < GameOver
            retry={retry}
            score={score}
          />}
      </div>
    </>
  );
}

export default App;
