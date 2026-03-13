# Wordle Clone

A reusable, tested, and strict React 19 Wordle clone built with clean architecture principles.

## Features

- **React 19**: Utilizes the new `use` hook and Transitions.
- **Context API**: Global state management for game logic using `WordleProvider`.
- **Data Fetching**: Custom `useAsync` hook for clean, suspense-compatible data fetching.
- **TypeScript**: Strictly typed codebase for high reliability.
- **Testing**: Unit tests with Vitest for logic and components.
- **Modular Architecture**: Component-based structure with clear separation of concerns (Logic vs View vs Context).

## Project Structure

```
src/
├── api/          # API integration logic
├── components/   # Reusable UI components
│   ├── Game/     # Main game container
│   ├── Guesses/  # Grid display
│   ├── Keyboard/ # Interactive keyboard
│   └── Layout/   # Page layout wrapper
├── context/      # React Context definitions and providers
├── data/         # Mock data and static resources
├── logic.ts      # Core game logic (pure functions)
├── pages/        # Route components (GamePage, Leaderboard, etc.)
├── shared/       # Shared hooks and utilities (useAsync)
└── App.tsx       # Main application routing
```

## Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run development server**:

    ```bash
    npm run dev
    ```

3.  **Run tests**:

    ```bash
    npm test
    ```

4.  **Lint code**:
    ```bash
    npm run lint
    ```

## Technologies Used

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Vitest](https://vitest.dev/)
