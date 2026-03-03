// src/Keyboard.tsx
import type { LetterStatus } from './logic';
import styles from './Keyboard.module.css';

interface KeyboardProps {
  getKeyState: (letter: string) => LetterStatus;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export function Keyboard({ getKeyState }: KeyboardProps) {
  return (
    <div className={styles.keyboard}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.row}
        >
          {row.map((letter) => {
            const status = getKeyState(letter);

            const backgroundColor =
              status === 'green'
                ? '#538d4e'
                : status === 'yellow'
                  ? '#b59f3b'
                  : status === 'dark'
                    ? '#3a3a3c'
                    : '#818384';

            return (
              <button
                key={letter}
                className={styles.key}
                style={{
                  backgroundColor,
                }}
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent('keydown', { key: letter }),
                  )
                }
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
