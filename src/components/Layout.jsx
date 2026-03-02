// src/components/Layout.jsx
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useThrottledCallback } from '../hooks/useThrottle';

const HeroScene = React.lazy(() => import('./HeroScene'));

const Layout = ({ children }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const updateMouse = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  }, []);
  const onGlobalMouseMove = useThrottledCallback(updateMouse, 80);
  const onGlobalMouseLeave = useCallback(() => setMouse({ x: 0, y: 0 }), []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Check if user has a dark mode preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    // Update class on document when dark mode changes
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Follow system preference if user hasn't explicitly chosen a theme
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) setIsDark(e.matches);
    };
    try {
      mq.addEventListener('change', handleChange);
    } catch (_) {
      // Safari < 14
      mq.addListener(handleChange);
    }
    return () => {
      try {
        mq.removeEventListener('change', handleChange);
      } catch (_) {
        mq.removeListener(handleChange);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    // Temporarily disable transitions to avoid staggered color changes
    root.classList.add('no-theme-transition');
    setIsDark(!isDark);
    // Keep the flag for one or two frames to allow styles to apply, then re-enable transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('no-theme-transition');
      });
    });
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Weather', href: '#weather' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div
      className="min-h-screen bg-[#e3f2fd] dark:bg-[#0d1b2a] transition-colors duration-300 relative"
      onMouseMove={onGlobalMouseMove}
      onMouseLeave={onGlobalMouseLeave}
    >
      {/* Site-wide Three.js background (lazy loaded for faster initial paint) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <HeroScene mouse={mouse} />
        </Suspense>
      </div>
      <nav className="fixed top-0 w-full glass-liquid glass-edge-light bg-white/60 dark:bg-black/40 z-50 transition-colors duration-300 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-all duration-200 ease-in-out px-3 py-2 rounded-md transform hover:scale-105 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {item.name}
                </a>
              ))}
              <DarkModeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <DarkModeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-liquid-soft bg-white/80 dark:bg-black/60 backdrop-blur-xl">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="relative pt-16 min-h-screen z-10">{children}</main>
    </div>
  );
};

export default Layout;