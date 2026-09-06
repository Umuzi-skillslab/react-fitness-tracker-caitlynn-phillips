import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer', () => {
  const mockProps = {
    audioUrl: '/assets/audio/motivation-track.mp3',
    title: 'Workout Motivation',
    description: 'Energetic beats',
  };

  test('renders title and description', () => {
    render(<AudioPlayer {...mockProps} />);
    expect(screen.getByText('Workout Motivation')).toBeInTheDocument();
    expect(screen.getByText('Energetic beats')).toBeInTheDocument();
  });

  test('renders HTML5 audio player', () => {
    render(<AudioPlayer {...mockProps} />);
    const audio = screen.getByText(/Your browser does not support the audio element/i).closest('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('controls');
  });

  test('toggles audio play/pause when button clicked', () => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();

    render(<AudioPlayer {...mockProps} />);
    const button = screen.getByText(/Play Audio 🎵/i);
    fireEvent.click(button);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
