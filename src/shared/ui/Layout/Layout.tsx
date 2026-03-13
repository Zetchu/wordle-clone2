import { Outlet, Link } from 'react-router-dom';
import styles from '../../../App.module.css';

export const Layout = () => {
  return (
    <div className={styles.app}>
      <nav
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Link
          to="/"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Play
        </Link>
        <Link
          to="/leaderboard"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Leaderboard
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};
