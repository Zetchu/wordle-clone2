import { useState, useEffect } from 'react';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import { useRandomWord } from './api/words';
import {
  calculateKeyboardState,
  evaluateGuess,
  type LetterStatus,
} from './logic';
import styles from './App.module.css';

export function Game() {
  const [secretWord, { refresh }] = useRandomWord();

  const [guesses, setGuesses] = useState<string[]>(Array(6).fill('     '));
  const [currentRow, setCurrentRow] = useState(0);

  const isWon = guesses.some((guess) => guess.trim() === secretWord);
  const isLost = currentRow === 6 && !isWon;

  useEffect(() => {
    if (!secretWord) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentRow >= 6 || isWon) return;
      const key = e.key.toUpperCase();
      const currentWord = guesses[currentRow].trim();

      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

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
    isWon;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRow, guesses, secretWord]);

  if (!secretWord) return null;

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
    if (rowIndex >= currentRow && !isWon) {
      return 'unused';
    }
    const evaluated = evaluateGuess(guessWord, secretWord);
    return evaluated[position];
  };

  const handleRefresh = () => {
    refresh();
    setGuesses(Array(6).fill('     '));
    setCurrentRow(0);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h1
        className={styles.header}
        onClick={handleRefresh}
        style={{ cursor: 'pointer' }}
        title='Click to restart'
      >
        Wordle Clone
      </h1>
      <Guesses
        guesses={guesses}
        getCellState={getCellState}
      />
      <Keyboard getKeyState={getKeyState} />
      {(isWon || isLost) && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>
            {isWon ? 'You Won!' : `Game Over! The word was ${secretWord}`}
          </h2>
          <button
            onClick={handleRefresh}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
