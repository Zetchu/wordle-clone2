import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the hook so App doesn't try to actually fetch
vi.mock('./api/words', () => ({
  useRandomWord: () => ['TESTS', { refresh: vi.fn() }],
}));

describe('App', () => {
  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // Wait for the async component to resolve/render
    await waitFor(() => {
      expect(screen.getByText(/Wordle Clone/i)).toBeInTheDocument();
    });
  });
});
