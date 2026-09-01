import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Small label used for difficulty and category tags throughout the app
const Badge = ({ text, variant }) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{text}</span>;
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['beginner', 'intermediate', 'advanced', 'default']),
};

Badge.defaultProps = {
  variant: 'default',
};

export default Badge;