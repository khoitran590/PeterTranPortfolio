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
        'fixed bottom-4 sm:top-5 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 pointer-events-none',
        className
      )}
    >
      <div className="site-nav pointer-events-auto flex items-center gap-1 py-1 px-1 rounded-full shadow-lg">
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
                document.getElementById(item.url.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-3 sm:px-4 lg:px-5 py-2 rounded-full transition-colors',
                'nav-link',
                isActive && 'nav-link-active'
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
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
          className="theme-toggle ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
