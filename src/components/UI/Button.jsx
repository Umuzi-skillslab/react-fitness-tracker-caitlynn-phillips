import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable button with variant-based styling (primary, secondary, danger)
const Button = ({ children, variant, onClick, type, disabled }) => {
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

// Default values for optional props
Button.defaultProps = {
  variant: 'primary',
  type: 'button',
  disabled: false,
};

export default Button;