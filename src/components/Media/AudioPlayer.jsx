import PropTypes from 'prop-types';
import styles from './Media.module.css';

// Embeds a motivational audio track with native HTML5 controls
const AudioPlayer = ({ audioUrl, title, description }) => {
  return (
    <div className={styles.audioContainer}>
      <h4>{title}</h4>
      <p>{description}</p>
      <audio controls className={styles.audio}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

AudioPlayer.defaultProps = {
  description: '',
};

export default AudioPlayer;