import { render, screen } from '@testing-library/react';

jest.mock(
  'lenis/react',
  () => ({ __esModule: true, default: ({ children }) => children }),
  { virtual: true }
);

jest.mock('./components/Weather', () => ({
  WeatherCard: () => <div>Weather</div>,
}));

import App from './App';

test('renders the portfolio heading', async () => {
  render(<App />);
  expect(await screen.findByRole('heading', { name: /peter tran/i })).toBeInTheDocument();
});
