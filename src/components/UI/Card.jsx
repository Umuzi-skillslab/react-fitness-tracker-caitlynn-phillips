import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Generic container component — wraps any content passed as children,
// and can optionally look "selected" via conditional styling
const Card = ({ children, selected = false, onClick, style = {} }) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      style={{ transition: 'box-shadow 0.2s ease-in-out', ...style }}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Card;