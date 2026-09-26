import React from 'react';
import { ArrowUpRight, Code2, Database, Smartphone } from 'lucide-react';

const skillGroups = [
  {
    title: 'Interfaces',
    icon: Code2,
    description: 'Responsive web and cross-platform experiences, from component systems to the details of everyday interactions.',
    skills: ['React', 'React Native', 'Next.js', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
    evidence: 'See TripSplit',
    href: 'https://github.com/hungbenjamin402/tripsplit_capstone',
  },
  {
    title: 'APIs & data',
    icon: Database,
    description: 'Application services and data models that support shared state, search, and reliable persistence.',
    skills: ['Node.js', 'Express', 'Firebase', 'Supabase', 'PostgreSQL', 'MongoDB', 'MySQL', 'SQL', 'PHP'],
    evidence: 'See Academic Event Mgmt',
    href: 'https://github.com/bwhelan212/academic-event-management-company',
  },
  {
    title: 'Native & software',
    icon: Smartphone,
    description: 'Native iOS development and focused software projects beyond the browser.',
    skills: ['Swift', 'SwiftUI', 'Python', 'C++'],
    evidence: 'See TripSplit iOS',
    href: 'https://github.com/khoitran590/TripsplitIOS',
  },
];

const Skills = () => (
  <section id="skills" aria-labelledby="skills-heading" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 id="skills-heading" className="page-heading font-extrabold tracking-tight text-white">Skills I use to build products.</h2>
        <p className="page-intro mt-4 text-white/65">The tools behind my portfolio work, grouped by the work they help me do.</p>
      </div>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {skillGroups.map(({ title, icon: Icon, description, skills, evidence, href }) => (
          <article key={title} className="grid gap-4 py-7 sm:py-9 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
            <div className="flex items-center gap-3 lg:items-start">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 accent-text">
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-relaxed text-white/70">{description}</p>
              <p className="mt-4 text-sm leading-7 text-white/80">{skills.join(' · ')}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold accent-text transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]">
                {evidence} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
