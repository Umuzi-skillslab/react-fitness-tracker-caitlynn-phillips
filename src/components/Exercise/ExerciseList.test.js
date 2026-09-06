import { render, screen } from '@testing-library/react';
import ExerciseList from './ExerciseList';

describe('ExerciseList', () => {
  const mockExercises = [
    {
      id: 1,
      name: 'Push-ups',
      category: 'strength',
      muscleGroups: ['chest'],
      difficulty: 'beginner',
      duration: 10,
      sets: 3,
      reps: 15,
    },
    {
      id: 2,
      name: 'Squats',
      category: 'strength',
      muscleGroups: ['legs'],
      difficulty: 'beginner',
      duration: 10,
      sets: 3,
      reps: 20,
    },
  ];

  test('shows loading state when isLoading is true', () => {
    render(<ExerciseList exercises={[]} isLoading={true} />);
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();
  });

  test('shows empty state when no exercises match', () => {
    render(<ExerciseList exercises={[]} isLoading={false} />);
    expect(screen.getByText(/no exercises found/i)).toBeInTheDocument();
  });

  test('renders a card for each exercise in the list', () => {
    render(<ExerciseList exercises={mockExercises} isLoading={false} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  test('marks an exercise as in-plan when its id is in plannedIds', () => {
    render(
      <ExerciseList exercises={mockExercises} isLoading={false} plannedIds={[1]} />
    );
    // Push-ups (id 1) should show "Added", Squats (id 2) should show "Add to Plan"
    expect(screen.getByText('Added ✓')).toBeInTheDocument();
    expect(screen.getByText('Add to Plan')).toBeInTheDocument();
  });
});