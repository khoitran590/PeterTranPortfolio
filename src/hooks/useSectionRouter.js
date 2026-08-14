// Hash-driven router for the tabbed layout.
//
// Each section is its own tab, but the URL still carries a real fragment
// (#projects, #gallery, ...). That keeps every existing link on the page
// working untouched, keeps the browser back button meaningful, and keeps a tab
// copy-pasteable and openable in a new window.
import { useCallback, useEffect, useState } from 'react';

export const SECTIONS = ['home', 'projects', 'about', 'skills', 'gallery', 'contact'];

const DEFAULT_SECTION = 'home';

const sectionFromHash = () => {
  const id = window.location.hash.replace(/^#/, '').toLowerCase();
  return SECTIONS.includes(id) ? id : DEFAULT_SECTION;
};

export default function useSectionRouter() {
  const [section, setSection] = useState(sectionFromHash);

  useEffect(() => {
    // `hashchange` catches anchors elsewhere in the page — the hero call to
    // action, the footer section list — so those need no special handling.
    // `popstate` catches the browser back and forward buttons.
    const sync = () => setSection(sectionFromHash());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const goToSection = useCallback((id) => {
    if (!SECTIONS.includes(id)) return;
    // pushState deliberately does not fire hashchange, so set the state here.
    if (window.location.hash.slice(1) !== id) {
      window.history.pushState(null, '', `#${id}`);
    }
    setSection(id);
  }, []);

  return [section, goToSection];
}
