import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

// Embeds an exercise demonstration video with HTML5 controls and custom state management
const VideoPlayer = ({ videoUrl, title, description = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Handle play event emitted by video element
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Handle pause event emitted by video element
  const handlePause = () => {
    setIsPlaying(false);
  };

  // Programmatic play/pause toggle button
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className={styles.videoContainer} style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <video
        ref={videoRef}
        controls
        width="100%"
        className={styles.video}
        onPlay={handlePlay}
        onPause={handlePause}
        style={{ borderRadius: '6px' }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={togglePlayPause}
          style={{
            padding: '0.3rem 0.8rem',
            backgroundColor: isPlaying ? '#dc2626' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause Video ⏸' : 'Play Video ▶'}
        </button>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;