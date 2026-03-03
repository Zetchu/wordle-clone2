# Wordle Clone

A simple Wordle clone built with React, TypeScript, and Vite.

## Features

- **Classic Wordle Gameplay**: Guess the 5-letter secret word in 6 tries.
- **Visual Feedback**:
  - 🟩 **Green**: Correct letter in the correct spot.
  - 🟨 **Yellow**: Correct letter in the wrong spot.
  - ⬛ **Dark/Gray**: Letter not in the word.
- **Keyboard Support**: Type your guesses using your physical keyboard.
- **On-Screen Keyboard**: Visual indicator of used letters.

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (or yarn/pnpm)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd wordle-clone
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the TypeScript code and builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## Project Structure

- `src/App.tsx`: Main application component managing game state and user input.
- `src/Guesses.tsx`: Component for displaying the grid of guesses.
- `src/Keyboard.tsx`: Component for the on-screen keyboard.
- `src/logic.ts`: Contains the game logic for evaluating guesses and updating key states.
- `src/main.tsx`: Entry point for the React application.

### Styling Architecture

The project uses a hybrid approach to styling, combining **CSS Modules** for structure and **Inline Styles** for dynamic game state.

1.  **CSS Modules (`.module.css`)**:
    - Used for structural layout, spacing, and base component styling (e.g., button shapes, grid layout).
    - Ensures styles are scoped to their specific components (`App`, `Guesses`, `Keyboard`) to avoid global namespace collisions.
    - Example: `src/Keyboard.module.css` handles the flex layout of keys, while `src/Guesses.module.css` handles the grid of letter tiles.

2.  **Inline Styles**:
    - Used for dynamic properties that change based on game logic, specifically the background colors of keys and tiles.
    - Since the state (correct, present, absent) is calculated at runtime in TypeScript, passing these values directly via the `style` prop is efficient and explicit.

3.  **Global Styles (`index.css`)**:
    - Handles high-level resets, font definitions, and the dark theme background color (`#121213`) to match the classic Wordle aesthetic.

## Future Improvements

- Randomize the secret word (currently hardcoded).
- Add animations for invalid words or winning/losing.
- Implement a "Game Over" modal or message.
- Add light/dark mode toggle.
