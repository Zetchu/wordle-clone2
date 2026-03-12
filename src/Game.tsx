import { useEffect } from 'react';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import { useRandomWord } from './api/words';
import styles from './App.module.css';
import { WordleProvider, useWordle } from './context';

export function Game() {
  const [secretWord, { refresh }] = useRandomWord();

  if (!secretWord) return null;

  return (
    <WordleProvider
      word={secretWord}
      refresh={refresh}
    >
      <GameView />
    </WordleProvider>
  );
}

function GameView() {
  const { state, updateCurrentGuess, submitGuess, refresh, isWon, isLost } =
    useWordle();
  const { guesses, currentRow } = state;

  useEffect(() => {
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
        submitGuess(currentWord);
      } else if (key === 'BACKSPACE') {
        if (currentWord.length > 0) {
          updateCurrentGuess(currentWord.slice(0, -1));
        }
      } else if (/^[A-Z]$/.test(key)) {
        if (currentWord.length < 5) {
          updateCurrentGuess(currentWord + key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRow, guesses, isWon, submitGuess, updateCurrentGuess]);

  const handleRefresh = () => {
    refresh();
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
      <Guesses />
      <Keyboard />
      {(isWon || isLost) && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>
            {isWon ? 'You Won!' : `Game Over! The word was ${state.secretWord}`}
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
