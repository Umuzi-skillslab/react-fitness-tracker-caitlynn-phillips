import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';

describe('App Integration', () => {
  // Reset localStorage and route before every test so each starts clean
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  test('adding an exercise from the Exercises page shows it in the Workout Planner', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    // Find the Push-ups card specifically (not just any "Add to Plan" button)
    const cardHeader = screen.getByText('Push-ups').parentElement;
    const card = cardHeader.parentElement;
    fireEvent.click(within(card).getByText('Add to Plan'));

    fireEvent.click(screen.getByText('Workout Planner'));
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('removing an exercise from the Workout Planner removes it from the day', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    const cardHeader = screen.getByText('Push-ups').parentElement;
    const card = cardHeader.parentElement;
    fireEvent.click(within(card).getByText('Add to Plan'));

    fireEvent.click(screen.getByText('Workout Planner'));
    expect(screen.getByText('Push-ups')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
  });

  test('logging a workout appears in the History list', () => {
    render(<App />);

    fireEvent.click(screen.getByText('History'));

    const exerciseSelect = screen.getByRole('combobox');
    fireEvent.change(exerciseSelect, { target: { value: '1' } }); // Push-ups has id 1

    const [setsInput, repsInput, weightInput] = screen.getAllByRole('spinbutton');
    fireEvent.change(setsInput, { target: { value: '3' } });
    fireEvent.change(repsInput, { target: { value: '15' } });
    fireEvent.change(weightInput, { target: { value: '0' } });

    fireEvent.click(screen.getByText('Log Workout'));

    expect(screen.getByRole('heading', { level: 4, name: 'Push-ups' })).toBeInTheDocument();
  });

  test('selecting an exercise from Home opens the detail modal', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Push-ups'));

    expect(screen.getByText('Push-ups demonstration')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});