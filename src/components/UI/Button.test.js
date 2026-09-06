import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies the primary variant class by default', () => {
    render(<Button>Default</Button>);
    const button = screen.getByText('Default');
    expect(button.className).toMatch(/primary/);
  });

  test('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});