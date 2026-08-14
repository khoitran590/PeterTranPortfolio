// src/components/Layout.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Home as HomeIcon, FolderGit2, Code2, UserRound, Images, Mail } from 'lucide-react';
import NavBar from './NavBar';
import Footer from './Footer';
import BackToTop from './BackToTop';

const navItems = [
  { name: 'Home', url: '#home', icon: HomeIcon },
  { name: 'Projects', url: '#projects', icon: FolderGit2 },
  { name: 'About', url: '#about', icon: UserRound },
  { name: 'Skills', url: '#skills', icon: Code2 },
  { name: 'Gallery', url: '#gallery', icon: Images },
  { name: 'Contact', url: '#contact', icon: Mail },
];

const STORAGE_KEY = 'portfolio-theme';
const NEXT_THEME = { system: 'light', light: 'dark', dark: 'system' };

// No stored preference means "follow the system", and that stays live for the
// whole visit. Previously the first toggle pinned a theme permanently with no
// way back to the system setting.
const readStoredTheme = () => {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : 'system';
};

// Matches the pre-paint script in public/index.html: no explicit light
// preference means dark.
const systemPrefersDark = () => !window.matchMedia?.('(prefers-color-scheme: light)')?.matches;

const Layout = ({ children, section, onNavigate }) => {
  const [theme, setTheme] = useState(readStoredTheme);
  const [systemIsDark, setSystemIsDark] = useState(systemPrefersDark);

  // Keep "system" actually following the system, including a mid-visit change
  // when the OS flips at sunset.
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!query) return undefined;
    const handleChange = (event) => setSystemIsDark(!event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const isDark = theme === 'system' ? systemIsDark : theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('theme-light', !isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';

    if (theme === 'system') window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, isDark]);

  const cycleTheme = useCallback(() => setTheme((current) => NEXT_THEME[current]), []);

  // Switching tabs replaces the whole main region. Reset the scroll position
  // and move focus into the new panel, otherwise a keyboard or screen reader
  // user is left pointing at content that no longer exists.
  //
  // This compares against the previous section rather than tracking a
  // "first render" flag: StrictMode runs mount effects twice, and a flag gets
  // spent on the discarded first pass, so the second pass focused <main> on
  // load and pushed the skip link and the whole nav out of the tab order.
  const previousSection = useRef(section);
  useEffect(() => {
    if (previousSection.current === section) return;
    previousSection.current = section;
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [section]);

  return (
    <div className="app-shell relative min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-2 font-semibold text-slate-950 shadow-lg focus:not-sr-only"
      >
        Skip to content
      </a>

      {/* Reading progress. Scroll-driven in CSS, so it costs no JavaScript. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
        <div className="scroll-progress h-full w-full" />
      </div>

      <div className="site-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      <NavBar
        items={navItems}
        theme={theme}
        onCycleTheme={cycleTheme}
        activeSection={section}
        onNavigate={onNavigate}
      />

      {/* tabIndex -1 means this is only ever focused programmatically (on a tab
          change, and by the back-to-top button), never by tabbing. Suppressing
          the ring loses no keyboard affordance and avoids drawing a box around
          the entire page every time a tab is opened. */}
      <main id="main-content" tabIndex="-1" className="relative z-10 focus:outline-none">
        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
