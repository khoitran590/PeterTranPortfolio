import { render, screen } from '@testing-library/react';

import App from './App';

test('renders recruiter-first hero actions', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /peter tran/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view selected work/i })).toHaveAttribute('href', '#projects');
  screen.getAllByRole('link', { name: /download résumé/i }).forEach((link) => {
    expect(link).toHaveAttribute('href', '/assets/Peter_Tran_Resume.pdf');
  });
});
