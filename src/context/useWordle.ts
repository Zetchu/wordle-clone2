import { useContext } from 'react';
import { WordleContext } from './context';

export function useWordle() {
  const context = useContext(WordleContext);
  if (!context) {
    throw new Error('useWordle must be used within a WordleProvider');
  }
  return context;
}
