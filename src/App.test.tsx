import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SpaceX Mission Dashboard', () => {
  render(<App />);
  // Update test to match actual content
  const titleElements = screen.getAllByText(/SpaceX/i);
  expect(titleElements.length).toBeGreaterThan(0);
  expect(titleElements[0]).toBeInTheDocument();
});