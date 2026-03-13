import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Game } from './Game';

// Mock the hook to return a predictable word immediately
vi.mock('../../api/words', () => ({
  useRandomWord: () => ['TESTS', { refresh: vi.fn() }],
}));

describe('Game Component', () => {
  it('renders the game title', () => {
    render(<Game />);
    expect(screen.getByText(/Wordle Clone/i)).toBeInTheDocument();
  });

  it('updates the grid when a user types', () => {
    render(<Game />);

    fireEvent.keyDown(window, { key: 'D' });

    const grid = screen.getByTestId('guesses-container');
    expect(within(grid).getByText('D')).toBeInTheDocument();
  });
});
