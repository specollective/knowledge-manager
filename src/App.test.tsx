import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders welcome heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders dynamic headings work', async () => {
  render(<App />);

  userEvent.click(screen.getByText('Physical Sciences'))
  let headingElement = screen.getByText(/physical-science/i);
  expect(headingElement).toBeInTheDocument();

  userEvent.click(screen.getByText('Formal Sciences'))
  headingElement = screen.getByText(/formal-science/i);
  expect(headingElement).toBeInTheDocument();
});
