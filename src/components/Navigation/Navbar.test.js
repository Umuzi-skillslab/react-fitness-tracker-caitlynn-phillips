import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders links to all main routes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('Workout Planner')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('applies active styling to the link matching the current route', () => {
    render(
      <MemoryRouter initialEntries={['/exercises']}>
        <Navbar />
      </MemoryRouter>
    );
    const exercisesLink = screen.getByText('Exercises');
    const homeLink = screen.getByText('Home');

    expect(exercisesLink.className).toMatch(/active/);
    expect(homeLink.className).not.toMatch(/active/);
  });
});