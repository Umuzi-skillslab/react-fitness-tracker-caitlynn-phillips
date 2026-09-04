import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders with the default placeholder', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search exercises...')).toBeInTheDocument();
  });

  test('calls onSearch as the user types', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search exercises...');
    await userEvent.type(input, 'push');

    // onSearch should have been called once per keystroke, ending with the full string
    expect(mockOnSearch).toHaveBeenLastCalledWith('push');
  });

  test('shows a Clear button only once text has been typed', async () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(screen.queryByText('Clear')).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText('Search exercises...');
    await userEvent.type(input, 'sq');

    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  test('clears the input and calls onSearch("") when Clear is clicked', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search exercises...');
    await userEvent.type(input, 'lunges');
    fireEvent.click(screen.getByText('Clear'));

    expect(input.value).toBe('');
    expect(mockOnSearch).toHaveBeenLastCalledWith('');
  });

  test('calls onSearch on form submit', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    fireEvent.submit(screen.getByText('Search'));
    expect(mockOnSearch).toHaveBeenCalled();
  });
});