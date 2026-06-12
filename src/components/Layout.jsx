// src/components/Layout.jsx
import React, { useEffect } from 'react';
import { Home as HomeIcon, FolderGit2, Code2, CloudSun, Images, Mail } from 'lucide-react';
import NavBar from './NavBar';

const navItems = [
  { name: 'Home', url: '#home', icon: HomeIcon },
  { name: 'Projects', url: '#projects', icon: FolderGit2 },
  { name: 'Skills', url: '#skills', icon: Code2 },
  { name: 'Weather', url: '#weather', icon: CloudSun },
  { name: 'Gallery', url: '#gallery', icon: Images },
  { name: 'Contact', url: '#contact', icon: Mail },
];

const Layout = ({ children }) => {
  // Force the dark, monochrome aesthetic site-wide.
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      {/* Subtle grid backdrop */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <NavBar items={navItems} />

      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
