import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

// Embeds a motivational audio track with HTML5 controls and custom playback state
const AudioPlayer = ({ audioUrl, title, description = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Handle play event from audio element
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Handle pause event from audio element
  const handlePause = () => {
    setIsPlaying(false);
  };

  // Programmatic play/pause toggle button
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className={styles.audioContainer} style={{ padding: '1rem', borderLeft: '4px solid #2563eb' }}>
      <h4>{title}</h4>
      <p>{description}</p>
      <audio
        ref={audioRef}
        controls
        className={styles.audio}
        onPlay={handlePlay}
        onPause={handlePause}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div style={{ marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={togglePlayPause}
          style={{
            padding: '0.3rem 0.8rem',
            backgroundColor: isPlaying ? '#dc2626' : '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause Audio ⏸' : 'Play Audio 🎵'}
        </button>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default AudioPlayer;