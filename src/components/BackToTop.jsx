// src/components/BackToTop.jsx – appears once the page has scrolled a screen
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frameId = null;
    const update = () => {
      frameId = null;
      setVisible(window.scrollY > window.innerHeight);
    };
    const requestUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    window.history.pushState(null, '', ' ');
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      // Sits above the mobile nav bar, and out of its way on desktop.
      className={`site-nav theme-toggle fixed bottom-[5.25rem] right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] sm:bottom-6 sm:right-6 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
