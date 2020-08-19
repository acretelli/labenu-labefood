import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders <App /> component correctly', () => {
  render(<App />);
  expect(screen.getByText(/labefood/i)).toBeInTheDocument();
});
