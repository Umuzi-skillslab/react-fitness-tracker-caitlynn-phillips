import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Simple loading indicator shown while data is being fetched/prepared
const Loading = ({ message }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: 'Loading...',
};

export default Loading;