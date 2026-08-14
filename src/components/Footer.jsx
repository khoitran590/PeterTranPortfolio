// src/components/Footer.jsx – closes the page out after the contact card
import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const links = [
  { href: 'https://github.com/khoitran590', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/peterkhoitran/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:khoitran590@gmail.com', label: 'Email', Icon: Mail },
  { href: '/assets/Peter_Tran_Resume.pdf', label: 'Résumé', Icon: FileText },
];

const sections = [
  { name: 'Projects', url: '#projects' },
  { name: 'About', url: '#about' },
  { name: 'Skills', url: '#skills' },
  { name: 'Gallery', url: '#gallery' },
  { name: 'Contact', url: '#contact' },
];

const Footer = () => (
  // The bottom padding clears the fixed mobile nav bar.
  <footer className="relative z-10 border-t border-white/10 pb-28 pt-12 sm:pb-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-bold text-white">Peter Tran</p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Software engineer building responsive web and mobile applications.
            Open to new opportunities.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map(({ href, label, Icon }) => {
              const external = href.startsWith('http');
              return (
                <a
                  key={label}
                  href={href}
                  target={external || href.endsWith('.pdf') ? '_blank' : undefined}
                  rel={external || href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">Sections</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 sm:grid-cols-1">
            {sections.map((section) => (
              <li key={section.name}>
                <a
                  href={section.url}
                  className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
                >
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Peter Tran. Built with React and Tailwind CSS.</p>
        <a
          href="https://github.com/khoitran590"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
        >
          Source on GitHub
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
