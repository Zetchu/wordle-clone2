// src/context/context.ts
import { createContext } from 'react';
import type { State, LetterStatus } from '../logic/logic';

export interface WordleContextType {
  state: State;
  submitGuess: (guess: string) => void;
  updateCurrentGuess: (guess: string) => void;
  refresh: () => void;
  isWon: boolean;
  isLost: boolean;
  getKeyState: (letter: string) => LetterStatus;
  getCellState: (
    guessWord: string,
    position: number,
    rowIndex: number,
  ) => LetterStatus;
}

export const WordleContext = createContext<WordleContextType | undefined>(
  undefined,
);
