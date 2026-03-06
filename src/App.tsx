import { Routes, Route } from 'react-router-dom';
import { Game } from './Game';
import { Leaderboard } from './Leaderboard';
import { GameDetail } from './GameDetail';
import { Layout } from './Layout';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          index
          element={<Game />}
        />
        <Route
          path='leaderboard'
          element={<Leaderboard />}
        />
        <Route
          path='leaderboard/:id'
          element={<GameDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
