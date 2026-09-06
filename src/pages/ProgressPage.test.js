import { render, screen } from '@testing-library/react';
import ProgressPage from './ProgressPage';

describe('ProgressPage', () => {
  const emptyPlan = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  test('renders the page heading', () => {
    render(<ProgressPage workoutHistory={[]} workoutPlan={emptyPlan} />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  test('renders progress stats based on workout history and plan', () => {
    const planWithExercises = { ...emptyPlan, monday: [{ id: 1, name: 'Push-ups' }] };
    const history = [{ id: 1, exerciseName: 'Push-ups', date: '1/1/2026', sets: 3, reps: 15, weight: 0 }];

    render(<ProgressPage workoutHistory={history} workoutPlan={planWithExercises} />);

    expect(screen.getByText('Workouts Logged')).toBeInTheDocument();
    expect(screen.getByText('Exercises Planned')).toBeInTheDocument();
    expect(screen.getByText('Total Sets Completed')).toBeInTheDocument();
  });
});