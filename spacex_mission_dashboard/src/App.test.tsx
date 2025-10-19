import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SpaceX Mission Dashboard', () => {
  render(<App />);
  // Update test to match actual content
  const titleElement = screen.getByText(/SpaceX/i);
  expect(titleElement).toBeInTheDocument();
});