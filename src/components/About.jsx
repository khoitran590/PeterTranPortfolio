// src/components/About.jsx
import React from 'react';
import { ArrowUpRight, Code2, FileText, GraduationCap, Layers3 } from 'lucide-react';

const About = () => (
  <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-24 py-20 sm:py-24">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <p className="section-kicker">About me</p>
        <h2 id="about-heading" className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
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
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <GraduationCap className="h-6 w-6 accent-text" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-bold text-white">Education</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            B.S. in Computer Science, Cal State Fullerton — 2025<br />
            Associate Degree, Cypress College — 2021
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <Layers3 className="h-6 w-6 accent-text" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-bold text-white">Product focus</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Clear interfaces, practical full-stack solutions, and mobile experiences that
            make everyday tasks easier.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:col-span-2 lg:col-span-1">
          <Code2 className="h-6 w-6 accent-text" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-bold text-white">Core toolkit</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            React, React Native, Node.js, TypeScript, SwiftUI, SQL, Firebase, and Supabase.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default About;
