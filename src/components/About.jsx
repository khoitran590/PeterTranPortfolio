// src/components/About.jsx
import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';

const About = () => (
  <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-24 py-20 sm:py-24">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <h2 id="about-heading" className="page-heading font-extrabold tracking-tight text-white">
          A thoughtful builder who enjoys shipping useful products.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          I’m a Computer Science graduate focused on creating responsive web and mobile
          applications. I enjoy turning an idea into a clear, approachable experience—from
          the interface people use to the APIs and data behind it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/assets/Peter_Tran_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-primary inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
          >
            <FileText size={18} aria-hidden="true" />
            Download résumé
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
          >
            Start a conversation
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10 lg:mt-1">
        <article className="py-6 sm:py-7">
          <h3 className="text-lg font-semibold text-white">Education</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            B.S. in Computer Science, Cal State Fullerton — 2025<br />
            Associate Degree, Cypress College — 2021
          </p>
        </article>
        <article className="py-6 sm:py-7">
          <h3 className="text-lg font-semibold text-white">Product focus</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Clear interfaces, practical full-stack solutions, and mobile experiences that
            make everyday tasks easier.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default About;
