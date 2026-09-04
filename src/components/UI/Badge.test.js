import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  test('renders the given text', () => {
    render(<Badge text="beginner" />);
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  test('applies the default variant class when none is given', () => {
    render(<Badge text="strength" />);
    const badge = screen.getByText('strength');
    expect(badge.className).toMatch(/default/);
  });

  test('applies the correct variant class when specified', () => {
    render(<Badge text="advanced" variant="advanced" />);
    const badge = screen.getByText('advanced');
    expect(badge.className).toMatch(/advanced/);
  });
});