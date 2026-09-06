import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer', () => {
  const mockProps = {
    videoUrl: '/assets/videos/pushups-tutorial.mp4',
    title: 'Push-ups Tutorial',
    description: 'Proper form demonstration',
  };

  test('renders title and description correctly', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText('Push-ups Tutorial')).toBeInTheDocument();
    expect(screen.getByText('Proper form demonstration')).toBeInTheDocument();
  });

  test('renders video element with correct source and controls', () => {
    render(<VideoPlayer {...mockProps} />);
    const video = screen.getByText(/Your browser does not support the video tag/i).closest('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('controls');
  });

  test('toggles play/pause button on click', () => {
    // Mock play and pause methods on HTMLMediaElement prototype
    window.HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();

    render(<VideoPlayer {...mockProps} />);
    const toggleBtn = screen.getByText(/Play Video ▶/i);
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
