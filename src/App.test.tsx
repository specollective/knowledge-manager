import React from 'react';
import { act, cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  test('renders application name', () => {
    render(<App />);
    const headingElement = screen.getByText(/Knowledge Manager/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders search prompt', async () => {
    render(<App />);

    act(() => {
      userEvent.click(screen.getByText(/Knowledge Manager/i))
    })

    await waitFor(() => {
      let headingElement = screen.getByText(/Search Knowledge Base/i);
      expect(headingElement).toBeInTheDocument();
    });
  });

  test('handles basic search', async () => {
    render(<App />);

    await act(async () => {
      userEvent.click(screen.getByText(/Knowledge Manager/i))
      await waitFor(() => {
        const searchInput = screen.getByLabelText('Search Knowledge Base')
        fireEvent.change(searchInput, { target: { value: 'Software' } })
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 13 })
        expect(screen.getByText(/Software Design/i)).toBeInTheDocument();
      });
    })
  });
  //
  // test('basic search works', async () => {
  //   render(<App />);
  //
  //   await waitFor(() => {
  //     act(() => {
  //       const searchInput = screen.getByLabelText('Search Knowledge Base')
  //       fireEvent.change(searchInput, { target: { value: 'Software' } })
  //       fireEvent.keyDown(searchInput, { key: 'Enter', code: 13 })
  //       expect(screen.getByText(/What is software design?/i)).toBeInTheDocument();
  //     })
  //   })
  // });
})
