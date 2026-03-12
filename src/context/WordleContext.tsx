import {
  useState,
  useMemo,
  type ReactNode,
  useCallback,
  useEffect,
} from 'react';
import {
  type State,
  createInitialState,
  calculateKeyboardState,
  evaluateGuess,
  type LetterStatus,
} from '../logic';
import { type WordleContextType, WordleContext } from './context';

// Export the provider
export function WordleProvider({
  children,
  word,
  refresh,
}: {
  children: ReactNode;
  word: string;
  refresh: () => void;
}) {
  // logic from useWordle
  const [state, setState] = useState<State>(() => createInitialState(word));

  useEffect(() => {
    // Reset state when word changes
    setState(createInitialState(word));
  }, [word]);

  const isWon = useMemo(() => {
    // Check if any guess matches the word
    return state.guesses.some((g) => g === state.secretWord);
  }, [state.guesses, state.secretWord]);

  const isLost = !isWon && state.currentRow === 6;

  const submitGuess = useCallback((guess: string) => {
    if (guess.trim().length === 5) {
      setState((prev) => ({ ...prev, currentRow: prev.currentRow + 1 }));
    }
  }, []);

  const updateCurrentGuess = useCallback((text: string) => {
    setState((prev) => {
      const newGuesses = [...prev.guesses];
      newGuesses[prev.currentRow] = text.padEnd(5, ' ');
      return { ...prev, guesses: newGuesses };
    });
  }, []);

  const getKeyState = useCallback(
    (letter: string): LetterStatus => {
      const used = calculateKeyboardState(
        state.guesses.slice(0, state.currentRow),
        state.secretWord,
      );
      return used[letter] || 'unused';
    },
    [state.guesses, state.currentRow, state.secretWord],
  );

  const getCellState = useCallback(
    (guessWord: string, position: number, rowIndex: number): LetterStatus => {
      if (rowIndex >= state.currentRow && !isWon) return 'unused';
      // Use helper from logic.ts if possible or implemented inline
      // Re-implementing simplified version since evaluateGuess exists
      const evaluated = evaluateGuess(guessWord, state.secretWord);
      return evaluated[position];
    },
    [state.currentRow, state.secretWord, isWon],
  );

  const value: WordleContextType = useMemo(
    () => ({
      state,
      isWon,
      isLost,
      submitGuess,
      updateCurrentGuess,
      getKeyState,
      getCellState,
      refresh,
    }),
    [
      state,
      isWon,
      isLost,
      submitGuess,
      updateCurrentGuess,
      getKeyState,
      getCellState,
      refresh,
    ],
  );

  return (
    <WordleContext.Provider value={value}>{children}</WordleContext.Provider>
  );
}
