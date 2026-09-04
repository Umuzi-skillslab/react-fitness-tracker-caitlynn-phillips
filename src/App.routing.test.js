import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Routing', () => {
  test('navigates to the Exercises page when its nav link is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Exercises'));
    expect(screen.getByText('Browse Exercises')).toBeInTheDocument();
  });

  test('navigates to the Workout Planner page when its nav link is clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Workout Planner'));
  expect(screen.getByRole('heading', { name: 'Workout Planner' })).toBeInTheDocument();
});

  test('shows the 404 page for an unknown route', () => {
    window.history.pushState({}, 'Test', '/this-route-does-not-exist');
    render(<App />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});