// client/src/components/__tests__/Header.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

/* global describe, it, expect */

describe('Header', () => {
  it('renders the title prop correctly', () => {
    render(<Header title="Test Title" />);
    const headingElement = screen.getByText(/Test Title/i);
    expect(headingElement).toBeInTheDocument();
  });
});