import { Routes, Route } from 'react-router-dom';
import { GamePage } from './GamePage';
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
          element={<GamePage />}
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
