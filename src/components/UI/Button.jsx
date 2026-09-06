import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable button with variant-based styling (primary, secondary, danger)
const Button = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  style = {},
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
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
  style: PropTypes.object,
};

export default Button;