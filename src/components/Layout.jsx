// src/components/Layout.jsx
import React, { useEffect, useState } from 'react';
import { Home as HomeIcon, FolderGit2, Code2, ChartNoAxesCombined, Images, Mail } from 'lucide-react';
import NavBar from './NavBar';

const navItems = [
  { name: 'Home', url: '#home', icon: HomeIcon },
  { name: 'About', url: '#about', icon: ChartNoAxesCombined },
  { name: 'Projects', url: '#projects', icon: FolderGit2 },
  { name: 'Skills', url: '#skills', icon: Code2 },
  { name: 'Gallery', url: '#gallery', icon: Images },
  { name: 'Contact', url: '#contact', icon: Mail },
];

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches ?? false;
    return savedTheme ? savedTheme === 'dark' : !prefersLight;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('theme-light', !isDark);
    window.localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="app-shell min-h-screen relative overflow-x-hidden">
      <div className="site-grid fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />

      <NavBar items={navItems} isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />

      <main className="relative z-10 pb-24 sm:pb-0">{children}</main>
    </div>
  );
};

export default Layout;
