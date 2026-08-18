import { StrictMode } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import App from './App';

const SECTIONS = ['Home', 'Projects', 'About', 'Skills', 'Gallery', 'Contact'];

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  window.localStorage.clear();
});

const openTab = async (name) => {
  const nav = screen.getByRole('navigation', { name: /primary navigation/i });
  fireEvent.click(within(nav).getByRole('link', { name }));
  await waitFor(() =>
    expect(within(nav).getByRole('link', { name })).toHaveAttribute('aria-current', 'page')
  );
};

test('renders recruiter-first hero actions', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /peter tran/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view selected work/i })).toHaveAttribute('href', '#projects');
  screen.getAllByRole('link', { name: /download résumé/i }).forEach((link) => {
    expect(link).toHaveAttribute('href', '/assets/Peter_Tran_Resume.pdf');
  });
});

test('every section is reachable from the navigation', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /primary navigation/i });
  // Skills and Gallery used to be desktop-only, leaving them unreachable on phones.
  SECTIONS.forEach((name) => {
    expect(within(nav).getByRole('link', { name })).toHaveAttribute('href', `#${name.toLowerCase()}`);
  });
});

test('home is the only panel rendered until another tab is opened', async () => {
  render(<App />);
  expect(screen.getByRole('img', { name: /flip-disk clock/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /skills i use to build products/i })).not.toBeInTheDocument();

  await openTab('Skills');

  expect(await screen.findByRole('heading', { name: /skills i use to build products/i })).toBeInTheDocument();
  // The previous panel is unmounted, not merely scrolled away.
  expect(screen.queryByRole('img', { name: /flip-disk clock/i })).not.toBeInTheDocument();
  expect(window.location.hash).toBe('#skills');
});

test('a deep link opens its tab directly', async () => {
  window.history.replaceState(null, '', '#about');
  render(<App />);

  expect(await screen.findByRole('heading', { name: /a thoughtful builder/i })).toBeInTheDocument();
  const nav = screen.getByRole('navigation', { name: /primary navigation/i });
  expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
});

test('anchors outside the nav switch tabs too', async () => {
  render(<App />);
  // The hero call to action is a plain #projects anchor; the router picks it up
  // through hashchange rather than needing its own handler.
  fireEvent.click(screen.getByRole('link', { name: /view selected work/i }));
  window.dispatchEvent(new Event('hashchange'));

  expect(await screen.findByRole('heading', { name: /projects/i })).toBeInTheDocument();
});

test('theme control cycles system, light and dark rather than latching', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: /^theme:/i });

  // Starts on "system", which stores nothing so it keeps following the OS.
  expect(toggle).toHaveAccessibleName(/following system/i);
  expect(window.localStorage.getItem('portfolio-theme')).toBeNull();

  fireEvent.click(toggle);
  expect(toggle).toHaveAccessibleName(/theme: light/i);
  expect(window.localStorage.getItem('portfolio-theme')).toBe('light');

  fireEvent.click(toggle);
  expect(toggle).toHaveAccessibleName(/theme: dark/i);
  expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');

  // Back to system, and the stored override is cleared.
  fireEvent.click(toggle);
  expect(toggle).toHaveAccessibleName(/following system/i);
  expect(window.localStorage.getItem('portfolio-theme')).toBeNull();
});

test('contact form reports what is wrong instead of failing silently', async () => {
  render(<App />);
  await openTab('Contact');

  fireEvent.click(await screen.findByRole('button', { name: /send message/i }));

  expect(screen.getByText(/add your name/i)).toBeInTheDocument();
  expect(screen.getByText(/add an email address/i)).toBeInTheDocument();
  expect(screen.getByText(/add a short message/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } });
  fireEvent.blur(screen.getByLabelText(/email address/i));
  expect(screen.getByText(/missing an @ or a domain/i)).toBeInTheDocument();
});

test('a fresh load leaves focus at the top of the document, not inside main', async () => {
  // Rendered in StrictMode on purpose. StrictMode double-invokes mount effects,
  // which is how the tab-change focus effect used to fire on load, park focus
  // on <main>, and push the skip link and the entire nav out of the tab order.
  render(<App />, { wrapper: StrictMode });

  expect(document.activeElement).toBe(document.body);
  expect(screen.getByRole('link', { name: /skip to content/i })).toBeInTheDocument();

  // Switching tabs must still hand focus to the new panel.
  await openTab('Skills');
  expect(document.activeElement).toBe(document.getElementById('main-content'));
});

test('the flip-disk matrix exposes a text alternative rather than 341 bare divs', () => {
  render(<App />);
  expect(screen.getByRole('img', { name: /flip-disk clock reading \d{2}:\d{2}/i })).toBeInTheDocument();
});

test('picking a disc color repaints the matrix and survives a reload', () => {
  window.localStorage.removeItem('flip-disk-color');
  const { unmount } = render(<App />);

  const group = screen.getByRole('group', { name: /disc color/i });
  const cyan = within(group).getByRole('button', { name: 'Cyan' });
  fireEvent.click(cyan);

  expect(cyan).toHaveAttribute('aria-pressed', 'true');
  expect(within(group).getByRole('button', { name: 'Lime' })).toHaveAttribute('aria-pressed', 'false');

  // The two theme variants both land on the wrapper; CSS picks between them, so
  // asserting on the properties is the only place the choice is observable.
  const matrix = document.querySelector('.flip-matrix');
  expect(matrix.style.getPropertyValue('--disk-on-dark')).toBe('#38e1f0');
  expect(matrix.style.getPropertyValue('--disk-on-light')).toBe('#09727b');
  expect(window.localStorage.getItem('flip-disk-color')).toBe('#38e1f0');

  unmount();
  render(<App />);
  expect(
    within(screen.getByRole('group', { name: /disc color/i })).getByRole('button', { name: 'Cyan' })
  ).toHaveAttribute('aria-pressed', 'true');
});
