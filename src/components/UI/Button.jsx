import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable button with variant-based styling (primary, secondary, danger)
const Button = ({ children, variant = 'primary', onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default Button;