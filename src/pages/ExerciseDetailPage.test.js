import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExerciseDetailPage from './ExerciseDetailPage';

describe('ExerciseDetailPage', () => {
  const mockExercises = [
    {
      id: 1,
      name: 'Push-ups',
      category: 'strength',
      difficulty: 'beginner',
      muscleGroups: ['chest'],
      duration: 10,
      sets: 3,
      reps: 15,
      caloriesBurn: 50,
      videoUrl: '/test.mp4',
      instructions: ['Step one', 'Step two'],
    },
  ];

  // Helper to render the page at a specific /exercises/:id route
  const renderAtRoute = (id) =>
    render(
      <MemoryRouter initialEntries={[`/exercises/${id}`]}>
        <Routes>
          <Route
            path="/exercises/:id"
            element={<ExerciseDetailPage exercises={mockExercises} plannedIds={[]} onAddToWorkout={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

  test('renders the exercise matching the route id', () => {
    renderAtRoute(1);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Step one')).toBeInTheDocument();
  });

  test('shows "not found" message for an id that does not exist', () => {
    renderAtRoute(999);
    expect(screen.getByText('Exercise not found.')).toBeInTheDocument();
  });

  test('has working Back/Previous/Next navigation buttons', () => {
    renderAtRoute(1);
    expect(screen.getByText('← Back to Exercises')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Confirm clicking doesn't throw — actual route-change assertions
    // are covered at the App level
    fireEvent.click(screen.getByText('Next'));
  });
});