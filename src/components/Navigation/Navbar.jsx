import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// Main navigation bar with active-route highlighting
const Navbar = () => {
  const location = useLocation();

  // Helper to decide if a link matches the current route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>FitTrack</span>
      <div className={styles.links}>
        <Link to="/" className={isActive('/') ? styles.active : ''}>
          Home
        </Link>
        <Link
          to="/exercises"
          className={location.pathname.startsWith('/exercises') ? styles.active : ''}
        >
          Exercises
        </Link>
        <Link
          to="/workout-planner"
          className={isActive('/workout-planner') ? styles.active : ''}
        >
          Workout Planner
        </Link>
        <Link to="/history" className={isActive('/history') ? styles.active : ''}>
          History
        </Link>
        <Link to="/progress" className={isActive('/progress') ? styles.active : ''}>
          Progress
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;