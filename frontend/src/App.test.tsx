// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Slack Connect App title', () => {
  render(<App />);
  const heading = screen.getByText(/Slack Connect App/i);
  expect(heading).toBeInTheDocument();
});