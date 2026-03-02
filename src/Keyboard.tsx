// src/Keyboard.tsx
import type { LetterStatus } from './logic';

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
    <div className='keyboard'>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            gap: '4px',
            justifyContent: 'center',
            marginBottom: '4px',
          }}
        >
          {row.map((letter) => {
            const status = getKeyState(letter);

            const backgroundColor =
              status === 'green'
                ? 'green'
                : status === 'yellow'
                  ? 'goldenrod'
                  : status === 'dark'
                    ? 'gray'
                    : 'lightgray';

            return (
              <span
                key={letter}
                style={{
                  backgroundColor,
                  padding: '10px',
                  cursor: 'pointer',
                  border: '1px solid black',
                  borderRadius: '4px',
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
