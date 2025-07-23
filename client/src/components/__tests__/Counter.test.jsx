// client/src/components/__tests__/Counter.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CounterProvider } from '../../context/CounterContext'; // Make sure this path is correct
import Counter from '../Counter';

describe('Counter', () => {
  // Use beforeEach to render the component with its provider before each test
  beforeEach(() => {
    render(
      <CounterProvider>
        <Counter />
      </CounterProvider>
    );
  });

  it('starts at zero', () => {
    expect(screen.getByText(/Counter: 0/i)).toBeInTheDocument 
   

  });

  it('increments when the +1 button is clicked', async () => {
    const user = userEvent.setup();
    const incrementButton = screen.getByRole('button', { name: '+1' });

    await user.click(incrementButton);
    expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument();
  });

  it('resets when the Reset button is clicked', async () => {
    const user = userEvent.setup();
    const incrementButton = screen.getByRole('button', { name: '+1' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    await user.click(incrementButton); // count becomes 1
    await user.click(resetButton); // count becomes 0

    expect(screen.getByText(/Counter: 0/i)).toBeInTheDocument();
  });
});