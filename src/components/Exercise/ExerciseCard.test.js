import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseCard from './ExerciseCard';

describe('ExerciseCard', () => {
  const mockExercise = {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest', 'triceps'],
    difficulty: 'beginner',
    duration: 10,
    sets: 3,
    reps: 15,
  };

  test('renders exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays difficulty and category badges', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('beginner')).toBeInTheDocument();
    expect(screen.getByText('strength')).toBeInTheDocument();
  });

  test('renders each muscle group as a tag', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('chest')).toBeInTheDocument();
    expect(screen.getByText('triceps')).toBeInTheDocument();
  });

  test('calls onSelect with exercise id when header is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Push-ups'));
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  test('calls onAdd with the exercise when Add button is clicked', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onAdd={mockOnAdd} />);
    fireEvent.click(screen.getByText('Add to Plan'));
    expect(mockOnAdd).toHaveBeenCalledWith(mockExercise);
  });

  test('shows "Added" state when isInPlan is true', () => {
    render(<ExerciseCard exercise={mockExercise} isInPlan={true} />);
    expect(screen.getByText('Added ✓')).toBeInTheDocument();
  });
});