// src/Guesses.tsx
import type { LetterStatus } from './logic';
import styles from './Guesses.module.css';

interface GuessesProps {
  guesses: string[];
  getCellState: (
    guessWord: string,
    position: number,
    rowIndex: number,
  ) => LetterStatus;
}

export function Guesses({ guesses, getCellState }: GuessesProps) {
  const displayGuesses = Array.from(
    { length: 6 },
    (_, i) => guesses[i] || ' '.repeat(5),
  );

  return (
    <div
      className={styles.guesses}
      data-testid='guesses-container'
    >
      {displayGuesses.map((guessWord, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.row}
        >
          {guessWord.split('').map((letter, letterIndex) => {
            // Pass rowIndex down!
            const status = getCellState(guessWord, letterIndex, rowIndex);

            const backgroundColor =
              status === 'green'
                ? '#538d4e'
                : status === 'yellow'
                  ? '#b59f3b'
                  : status === 'dark'
                    ? '#3a3a3c'
                    : 'transparent';

            const borderColor =
              status === 'unused' && letter.trim()
                ? '#565758'
                : status === 'unused'
                  ? '#3a3a3c'
                  : 'transparent';
            return (
              <span
                key={letterIndex}
                className={styles.letter}
                style={{
                  backgroundColor,
                  borderColor: borderColor,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
