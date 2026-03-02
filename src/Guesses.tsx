// src/Guesses.tsx
import type { LetterStatus } from './logic';

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
    <div className='guesses-board'>
      {displayGuesses.map((guessWord, rowIndex) => (
        <div
          key={rowIndex}
          className='guess-row'
          style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}
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

            const textColor = status === 'unused' ? 'white' : 'white';

            return (
              <span
                key={letterIndex}
                style={{
                  backgroundColor,
                  color: textColor,
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #3a3a3c',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
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
