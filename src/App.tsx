// src/App.tsx
import { useState, useEffect } from 'react';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import {
  calculateKeyboardState,
  evaluateGuess,
  type LetterStatus,
} from './logic';

function App() {
  const [secretWord] = useState('APPLE');

  // Start with a completely blank board (6 rows of 5 spaces)
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill('     '));
  // Keep track of which guess the user is currently on (0 to 5)
  const [currentRow, setCurrentRow] = useState(0);

  // --- INTERACTIVITY LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Stop typing if game is over (6 guesses max)
      if (currentRow >= 6) return;

      const key = e.key.toUpperCase();
      const currentWord = guesses[currentRow].trim(); // Get what's typed so far without the padding spaces

      if (key === 'ENTER') {
        // Only submit if it's a full 5-letter word
        if (currentWord.length === 5) {
          setCurrentRow((prev) => prev + 1);
        }
      } else if (key === 'BACKSPACE') {
        // Remove the last letter and pad back to 5 spaces
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentRow] = currentWord.slice(0, -1).padEnd(5, ' ');
          return newGuesses;
        });
      } else if (/^[A-Z]$/.test(key)) {
        // If it's a letter A-Z, add it to the word (max 5 letters)
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
    // Cleanup listener to prevent duplicates
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRow, guesses]);

  // --- COLORING LOGIC ---

  // Only calculate keyboard colors for rows you've already hit "Enter" on
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
    // If this is the row you are currently typing in (or a future row), leave it uncolored
    if (rowIndex >= currentRow) {
      return 'unused';
    }
    const evaluated = evaluateGuess(guessWord, secretWord);
    return evaluated[position];
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Wordle Clone</h1>
      <Guesses
        guesses={guesses}
        getCellState={getCellState}
      />
      <br />
      <Keyboard getKeyState={getKeyState} />
    </div>
  );
}

export default App;
