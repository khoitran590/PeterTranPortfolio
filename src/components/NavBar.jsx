// src/components/NavBar.jsx – tubelight bottom/top nav, adapted for CRA
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  // Keep the active tab in sync with the section currently in view.
  useEffect(() => {
    const ids = items
      .map((item) => item.url.replace('#', ''))
      .filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = items.find((i) => i.url === `#${visible.target.id}`);
          if (match) setActiveTab(match.name);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        'fixed bottom-3 sm:top-5 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 pointer-events-none',
        className
      )}
    >
      <nav aria-label="Primary navigation" className="site-nav pointer-events-auto flex items-center gap-1 rounded-2xl px-1 py-1 shadow-lg sm:rounded-full">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(event) => {
                event.preventDefault();
                setActiveTab(item.name);
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                document.getElementById(item.url.slice(1))?.scrollIntoView({
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start',
                });
              }}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'relative inline-flex min-w-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:min-w-0 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm lg:px-5',
                'nav-link',
                !item.mobile && 'hidden sm:inline-flex',
                isActive && 'nav-link-active'
              )}
            >
              <span className="sm:hidden" aria-hidden="true">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              <span>{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
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
