import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Small label used for difficulty and category tags throughout the app
const Badge = ({ text, variant = 'default', style = {} }) => {
  return (
    <span
      className={`${styles.badge} ${styles[variant]}`}
      style={{ display: 'inline-block', fontWeight: 600, ...style }}
    >
      {text}
    </span>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['beginner', 'intermediate', 'advanced', 'default']),
  style: PropTypes.object,
};

export default Badge;