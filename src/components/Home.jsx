// src/components/Home.jsx
import React from 'react';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import FlipDiskMatrix from './ui/flip-disk-matrix';

const socialLinks = [
  { href: 'https://github.com/khoitran590', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/peterkhoitran/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:khoitran590@gmail.com', label: 'Email', Icon: Mail },
];

const Home = () => {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-24">
      <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-5xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col items-center text-center">
            {/* fetchpriority stays lowercase: React 18 passes unknown lowercase
                attributes straight to the DOM but warns on the camelCase form. */}
            <img
              src="/assets/peter-portrait.jpg"
              alt="Peter Tran"
              width={320}
              height={320}
              fetchpriority="high"
              decoding="async"
              className="mb-8 h-24 w-24 rounded-full object-cover shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/15 sm:h-28 sm:w-28"
            />

            <h1 className="hero-heading mb-4 font-extrabold tracking-tight text-white">
              Peter Tran
            </h1>
            <p className="mb-5 text-base font-semibold text-white/75 md:text-xl">
              Software Engineer · Web, mobile, and product-minded development
            </p>
            <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-white/60 md:text-xl">
              Computer Science graduate from Cal State Fullerton building responsive web
              and mobile applications with a focus on thoughtful user experiences and
              clean engineering practices.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="hero-primary rounded-xl px-7 py-3.5 inline-flex items-center justify-center gap-2 font-semibold text-black bg-neutral-100 hover:bg-white transition-[background-color,transform] duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-background)]"
              >
                View selected work
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a
                href="/assets/Peter_Tran_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition-[background-color,transform] duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-background)]"
              >
                <FileText size={18} aria-hidden="true" />
                Download résumé
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-5" aria-label="Peter's profiles">
              {socialLinks.map(({ href, label, Icon }) => {
                const external = href.startsWith('http');
                return (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </a>
                );
              })}
            </div>
          </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
            Electromechanical clock
          </h2>
        </div>
        <FlipDiskMatrix />
      </div>
    </section>
  );
};

export default Home;
