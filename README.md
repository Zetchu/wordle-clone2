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

## Future Improvements

- Randomize the secret word (currently hardcoded).
- Add animations for invalid words or winning/losing.
- Implement a "Game Over" modal or message.
- Add light/dark mode toggle.
