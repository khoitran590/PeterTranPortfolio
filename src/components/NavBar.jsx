// src/components/NavBar.jsx – tab bar for the section-per-tab layout.
//
// These are still anchors rather than role="tab" buttons on purpose: each tab
// is a real, linkable destination with its own URL, so links give screen reader
// users the right affordance and keep cmd-click / middle-click working. The
// visual treatment is a tab strip; the semantics are navigation.
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * @typedef {Object} NavItem
 * @property {string} name
 * @property {string} url
 * @property {import('lucide-react').LucideIcon} icon
 */

const THEME_ICON = { system: Monitor, light: Sun, dark: Moon };
const THEME_LABEL = { system: 'Following system', light: 'Light', dark: 'Dark' };
const NEXT_THEME = { system: 'light', light: 'dark', dark: 'system' };

// A modified click means the visitor wants a new tab or window; let the browser
// own those instead of hijacking them into a same-page tab switch.
const isPlainLeftClick = (event) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export function NavBar({ items, className, theme, onCycleTheme, activeSection, onNavigate }) {
  const reduceMotion = useReducedMotion();

  // Fall back rather than crash if an unknown value is ever passed in.
  const currentTheme = THEME_ICON[theme] ? theme : 'system';
  const ThemeIcon = THEME_ICON[currentTheme];

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
          const id = item.url.slice(1);
          const isActive = activeSection === id;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(event) => {
                if (!isPlainLeftClick(event)) return;
                event.preventDefault();
                onNavigate(id);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                // 2.75rem fits all six sections on a 360px viewport while still
                // clearing the 44px minimum touch target.
                'relative inline-flex min-w-[2.75rem] flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1.5 text-[9px] font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] sm:min-w-0 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm sm:tracking-normal lg:px-5',
                'nav-link',
                isActive && 'nav-link-active'
              )}
            >
              {isActive ? (
                // Shared layout id slides the pill between tabs rather than
                // cross-fading it. Skipped entirely under reduced motion.
                <motion.span
                  layoutId={reduceMotion ? undefined : 'nav-indicator'}
                  className="nav-indicator absolute inset-0 rounded-xl sm:rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative sm:hidden" aria-hidden="true">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              <span className="relative">{item.name}</span>
            </a>
          );
        })}
        <button
          type="button"
          onClick={onCycleTheme}
          className="theme-toggle ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
          aria-label={`Theme: ${THEME_LABEL[currentTheme]}. Switch to ${THEME_LABEL[NEXT_THEME[currentTheme]].toLowerCase()}.`}
          title={`Theme: ${THEME_LABEL[currentTheme]}`}
        >
          <ThemeIcon size={17} aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
