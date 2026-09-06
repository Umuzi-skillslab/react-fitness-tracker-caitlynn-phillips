import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// Main navigation bar with active-route highlighting and responsive mobile menu toggle
const Navbar = () => {
  const location = useLocation();
  // Local state for toggling mobile menu open/closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to decide if a link matches the current route
  const isActive = (path) => location.pathname === path;

  // Toggle mobile navigation menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when a navigation link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brandContainer}>
        <span className={styles.brand} style={{ letterSpacing: '0.5px' }}>
          FitTrack
        </span>
        <button
          className={styles.hamburgerBtn}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>
      <div
        className={`${styles.links} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
      >
        <Link
          to="/"
          className={isActive('/') ? styles.active : ''}
          onClick={handleLinkClick}
        >
          Home
        </Link>
        <Link
          to="/exercises"
          className={location.pathname.startsWith('/exercises') ? styles.active : ''}
          onClick={handleLinkClick}
        >
          Exercises
        </Link>
        <Link
          to="/workout-planner"
          className={isActive('/workout-planner') ? styles.active : ''}
          onClick={handleLinkClick}
        >
          Workout Planner
        </Link>
        <Link
          to="/history"
          className={isActive('/history') ? styles.active : ''}
          onClick={handleLinkClick}
        >
          History
        </Link>
        <Link
          to="/progress"
          className={isActive('/progress') ? styles.active : ''}
          onClick={handleLinkClick}
        >
          Progress
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;