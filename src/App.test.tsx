import React from 'react';
import { act, cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  test('renders welcome heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Knowledge Manager/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('root path', async () => {
    render(<App />);

    act(() => {
      userEvent.click(screen.getByText(/Knowledge Manager/i))
    })

    await waitFor(() => {
      let headingElement = screen.getByText(/Search Knowledge Base/i);
      expect(headingElement).toBeInTheDocument();
    });
  });

  test('ok', async () => {
    render(<App />);

    await act(async () => {
      userEvent.click(screen.getByText(/Knowledge Manager/i))
      await waitFor(() => {
        const searchInput = screen.getByLabelText('Search Knowledge Base')
        fireEvent.change(searchInput, { target: { value: 'Software' } })
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 13 })
        expect(screen.getByText(/What is software design?/i)).toBeInTheDocument();
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
