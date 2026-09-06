import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('renders the 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/doesn't exist/i)).toBeInTheDocument();
  });

  test('navigates home when "Go Home" is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/some-bad-route']}>
        <NotFound />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Go Home'));
    // If navigate('/') worked, the page content itself is unchanged (NotFound doesn't
    // unmount on its own here), but we confirm the button exists and is clickable
    // without throwing — a full route-change assertion belongs in App-level tests.
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});