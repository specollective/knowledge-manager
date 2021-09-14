import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders welcome heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders dynamic headings work', async () => {
  render(<App />);

  userEvent.click(screen.getByText('Software Engineering'))

  waitFor(() => {
    let headingElement = screen.getByText(/What is software engineering?/i);
    expect(headingElement).toBeInTheDocument();
  })
});
