export interface Game {
  id: string;
  word: string;
  date: string;
}

export interface Score {
  id: string;
  gameId: string;
  userId: string;
  guesses: number;
  duration: number; // seconds
  timestamp: string;
}

const games: Game[] = [
  { id: '1', word: 'APPLE', date: '2023-10-01' },
  { id: '2', word: 'BEACH', date: '2023-10-02' },
  { id: '3', word: 'CRANE', date: '2023-10-03' },
  { id: '4', word: 'DRIVE', date: '2023-10-04' },
  { id: '5', word: 'EAGLE', date: '2023-10-05' },
];

const generateScores = () => {
  const scores: Score[] = [];
  games.forEach((game) => {
    // Generate 15 scores per game to test "top 10" vs "top 3"
    for (let i = 0; i < 15; i++) {
      scores.push({
        id: `${game.id}-${i}`,
        gameId: game.id,
        userId: `User${Math.floor(Math.random() * 1000)}`,
        guesses: Math.floor(Math.random() * 6) + 1,
        duration: Math.floor(Math.random() * 300) + 30, // 30s to 330s
        timestamp: new Date().toISOString(),
      });
    }
  });
  return scores;
};

const scores: Score[] = generateScores();

export const getGames = (): Game[] => {
  return games;
};

export const getGame = (id: string): Game | undefined => {
  return games.find((g) => g.id === id);
};

export const getScores = (gameId: string): Score[] => {
  return scores
    .filter((s) => s.gameId === gameId)
    .sort((a, b) => {
      if (a.guesses !== b.guesses) return a.guesses - b.guesses;
      return a.duration - b.duration;
    });
};

export const getTopScores = (gameId: string, limit: number): Score[] => {
  return getScores(gameId).slice(0, limit);
};
