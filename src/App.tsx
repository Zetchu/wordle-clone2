// src/App.tsx
import { useState, useEffect } from 'react';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import {
  calculateKeyboardState,
  evaluateGuess,
  type LetterStatus,
} from './logic';
import styles from './App.module.css';

function App() {
  const [secretWord] = useState('DAVID');

  const [guesses, setGuesses] = useState<string[]>(Array(6).fill('     '));
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentRow >= 6) return;

      const key = e.key.toUpperCase();
      const currentWord = guesses[currentRow].trim();
      if (key === 'ENTER') {
        if (currentWord.length === 5) {
          setCurrentRow((prev) => prev + 1);
        }
      } else if (key === 'BACKSPACE') {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentRow] = currentWord.slice(0, -1).padEnd(5, ' ');
          return newGuesses;
        });
      } else if (/^[A-Z]$/.test(key)) {
        if (currentWord.length < 5) {
          setGuesses((prev) => {
            const newGuesses = [...prev];
            newGuesses[currentRow] = (currentWord + key).padEnd(5, ' ');
            return newGuesses;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRow, guesses]);

  // --- COLORING LOGIC ---

  const committedGuesses = guesses.slice(0, currentRow);
  const keyboardStateMap = calculateKeyboardState(committedGuesses, secretWord);

  const getKeyState = (letter: string): LetterStatus => {
    return keyboardStateMap[letter.toUpperCase()] || 'unused';
  };

  const getCellState = (
    guessWord: string,
    position: number,
    rowIndex: number,
  ): LetterStatus => {
    if (rowIndex >= currentRow) {
      return 'unused';
    }
    const evaluated = evaluateGuess(guessWord, secretWord);
    return evaluated[position];
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Wordle Clone</h1>
      <Guesses
        guesses={guesses}
        getCellState={getCellState}
      />
      <Keyboard getKeyState={getKeyState} />
    </div>
  );
}

export default App;
