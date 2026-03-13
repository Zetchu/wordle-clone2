import { Routes, Route } from 'react-router-dom';
import { GamePage } from './pages/GamePage';
import { Leaderboard } from './pages/Leaderboard';
import { GameDetail } from './pages/GameDetail';
import { Layout } from './components/Layout/Layout';

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
