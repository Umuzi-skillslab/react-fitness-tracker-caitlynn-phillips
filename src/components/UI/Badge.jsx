import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Small label used for difficulty and category tags throughout the app
const Badge = ({ text, variant = 'default' }) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{text}</span>;
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['beginner', 'intermediate', 'advanced', 'default']),
};

export default Badge;