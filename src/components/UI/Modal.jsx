import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Overlay dialog that renders whatever is passed as children —
// used for exercise detail popups and workout logging forms
const Modal = ({ children, isOpen, onClose }) => {
  // Don't render anything if the modal isn't open
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;