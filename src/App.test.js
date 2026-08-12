import { fireEvent, render, screen } from '@testing-library/react';
import { Images, Mail } from 'lucide-react';

import App from './App';
import { NavBar } from './components/NavBar';

test('renders recruiter-first hero actions', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /peter tran/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view selected work/i })).toHaveAttribute('href', '#projects');
  screen.getAllByRole('link', { name: /download résumé/i }).forEach((link) => {
    expect(link).toHaveAttribute('href', '/assets/Peter_Tran_Resume.pdf');
  });
});

test('marks Contact active when it has passed the navigation reading line', () => {
  const gallery = document.createElement('section');
  gallery.id = 'gallery';
  gallery.getBoundingClientRect = () => ({ top: -320 });

  const contact = document.createElement('section');
  contact.id = 'contact';
  contact.getBoundingClientRect = () => ({ top: 120 });
  contact.scrollIntoView = jest.fn();

  document.body.append(gallery, contact);
  const originalAnimationFrame = window.requestAnimationFrame;
  const originalCancelAnimationFrame = window.cancelAnimationFrame;
  const originalMatchMedia = window.matchMedia;
  window.requestAnimationFrame = (callback) => {
    callback();
    return 0;
  };
  window.cancelAnimationFrame = jest.fn();
  window.matchMedia = jest.fn(() => ({ matches: false }));

  const { unmount } = render(
    <NavBar
      items={[
        { name: 'Gallery', url: '#gallery', icon: Images },
        { name: 'Contact', url: '#contact', icon: Mail },
      ]}
      isDark={true}
      onToggleTheme={jest.fn()}
    />
  );

  const contactLink = screen.getByRole('link', { name: 'Contact' });
  expect(contactLink).toHaveAttribute('aria-current', 'location');

  fireEvent.click(contactLink);
  expect(contact.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  expect(window.location.hash).toBe('#contact');

  unmount();
  gallery.remove();
  contact.remove();
  window.requestAnimationFrame = originalAnimationFrame;
  window.cancelAnimationFrame = originalCancelAnimationFrame;
  window.matchMedia = originalMatchMedia;
});
