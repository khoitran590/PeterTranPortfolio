// src/components/NavBar.jsx – responsive section navigation
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * @typedef {Object} NavItem
 * @property {string} name
 * @property {string} url
 * @property {import('lucide-react').LucideIcon} icon
 */

export function NavBar({ items, className, isDark, onToggleTheme }) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [pendingTab, setPendingTab] = useState(null);

  // Keep a clicked destination selected while smooth scrolling is in progress.
  // This avoids the indicator jumping back to the section leaving the viewport.
  useEffect(() => {
    if (!pendingTab) return undefined;
    const timeoutId = window.setTimeout(() => setPendingTab(null), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [pendingTab]);

  // Select the last section above a fixed reading line. This is deterministic
  // for short sections such as Contact that sit immediately after Gallery.
  useEffect(() => {
    const sections = items
      .map((item) => ({ item, element: document.getElementById(item.url.slice(1)) }))
      .filter(({ element }) => element);
    if (sections.length === 0) return undefined;

    let frameId = null;
    const updateActiveTab = () => {
      frameId = null;
      const readingLine = window.innerHeight * 0.38;
      const pendingSection = pendingTab
        ? sections.find(({ item }) => item.name === pendingTab)
        : null;

      if (pendingSection) {
        const targetTop = pendingSection.element.getBoundingClientRect().top;
        const targetHasArrived = targetTop >= -4 && targetTop <= 144;
        if (!targetHasArrived) return;

        setActiveTab(pendingSection.item.name);
        setPendingTab(null);
        return;
      }

      const passedSections = sections.filter(
        ({ element }) => element.getBoundingClientRect().top <= readingLine
      );
      const currentSection = passedSections.length
        ? passedSections[passedSections.length - 1]
        : sections[0];

      setActiveTab((current) =>
        current === currentSection.item.name ? current : currentSection.item.name
      );
    };

    const requestUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateActiveTab);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('hashchange', requestUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('hashchange', requestUpdate);
    };
  }, [items, pendingTab]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-3 left-1/2 z-50 -translate-x-1/2 sm:top-5 sm:bottom-auto',
        className
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="site-nav pointer-events-auto flex items-center gap-1 rounded-2xl px-1 py-1 shadow-lg sm:rounded-full"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById(item.url.slice(1));
                if (!target) return;

                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const behavior = prefersReducedMotion ? 'auto' : 'smooth';

                setActiveTab(item.name);
                setPendingTab(behavior === 'smooth' ? item.name : null);
                window.history.pushState(null, '', item.url);
                target.scrollIntoView({ behavior, block: 'start' });
              }}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'relative inline-flex min-w-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:min-w-0 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm lg:px-5',
                'nav-link',
                !item.mobile && 'hidden sm:inline-flex',
                isActive && 'nav-link-active'
              )}
            >
              <span className="sm:hidden" aria-hidden="true">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              <span>{item.name}</span>
            </a>
          );
        })}
        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
