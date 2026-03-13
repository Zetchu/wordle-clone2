import { Routes, Route } from 'react-router-dom';
import { GamePage } from './pages/GamePage';
import { Leaderboard } from './features/leaderboard';
import { GameDetail } from './features/leaderboard';
import { Layout } from './shared/ui/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GamePage />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="leaderboard/:id" element={<GameDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
