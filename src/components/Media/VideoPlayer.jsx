import PropTypes from 'prop-types';
import styles from './Media.module.css';

// Embeds an exercise demonstration video with native HTML5 controls
const VideoPlayer = ({ videoUrl, title, description = '' }) => {
  return (
    <div className={styles.videoContainer}>
      <h3>{title}</h3>
      <p>{description}</p>
      <video controls width="100%" className={styles.video}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;