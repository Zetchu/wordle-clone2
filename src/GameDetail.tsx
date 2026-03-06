import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGame, getTopScores, type Game, type Score } from './data/mockData';
import styles from './GameDetail.module.css';

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    if (id) {
      const gameData = getGame(id);
      if (gameData) {
        setGame(gameData);
        setScores(getTopScores(id, 10)); // Top 3 scorers is for list, 10 for detail
      }
    }
  }, [id]);

  if (!game) {
    return (
      <div className={styles.detailContainer}>Loading or Game not found...</div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <Link
        to='/leaderboard'
        className={styles.backLink}
      >
        Back to Leaderboard
      </Link>
      <h1 className={styles.title}>
        Game #{game.id} - {game.date}
      </h1>
      <p>Word: *{game.word[0]}***</p>{' '}
      {/* Hide the secret word slightly or show it */}
      <ul className={styles.scoreList}>
        {scores.map((score, index) => (
          <li
            key={score.id}
            className={styles.scoreItem}
          >
            <span className={styles.rank}>#{index + 1}</span>
            <span className={styles.user}>{score.userId}</span>
            <span className={styles.stats}>
              {score.guesses} guesses ({score.duration}s)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
