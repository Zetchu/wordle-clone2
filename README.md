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
├── features/     # Feature-based modules
│   ├── game/     # Game feature (components, logic, context, api)
│   └── leaderboard/ # Leaderboard feature
├── pages/        # Route components (thin wrappers)
├── shared/       # Shared hooks, ui, api
│   ├── api/      # Shared API integration logic
│   ├── ui/       # Shared UI components (Layout)
│   └── useAsync/ # Shared hooks
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
