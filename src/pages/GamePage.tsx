import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Game } from '../features/game';

export function GamePage() {
  return (
    <ErrorBoundary fallback={<div>Error loading the game...</div>}>
      <Suspense fallback={<div>Loading Wordle...</div>}>
        <Game />
      </Suspense>
    </ErrorBoundary>
  );
}
