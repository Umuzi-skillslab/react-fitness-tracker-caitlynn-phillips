import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Generic container component — wraps any content passed as children,
// and can optionally look "selected" via conditional styling
const Card = ({ children, selected = false, onClick }) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;