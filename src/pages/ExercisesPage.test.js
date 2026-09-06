import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExercisesPage from './ExercisesPage';

describe('ExercisesPage', () => {
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
      name: 'Running',
      category: 'cardio',
      muscleGroups: ['legs'],
      difficulty: 'beginner',
      duration: 30,
      sets: 1,
      reps: 1,
    },
  ];

  test('shows a loading state immediately on mount', () => {
    render(<ExercisesPage exercises={mockExercises} plannedIds={[]} />);
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();
  });

  // Async test: the useEffect-driven loading state resolves after its timeout,
  // revealing the actual exercise list
  test('shows the exercise list once loading finishes', async () => {
    render(<ExercisesPage exercises={mockExercises} plannedIds={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  // Hook behavior test: typing in the search box (useState) narrows the
  // rendered list without needing a page reload or extra prop changes
  test('filters the exercise list as the user types in the search bar', async () => {
    render(<ExercisesPage exercises={mockExercises} plannedIds={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by exercise name...');
    await userEvent.type(searchInput, 'Running');

    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
  });

  // Hook behavior test: selecting a category filter (useState) also narrows the list
  test('filters the exercise list when a category is selected', async () => {
    render(<ExercisesPage exercises={mockExercises} plannedIds={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    const categorySelect = screen.getAllByRole('combobox')[0];
    await userEvent.selectOptions(categorySelect, 'cardio');

    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
  });
});