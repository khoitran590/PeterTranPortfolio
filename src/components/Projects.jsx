// src/components/Projects.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

const TECH_NAMES = {
  reactnative: 'React Native',
  react: 'React',
  'node.js': 'Node.js',
  nodejs: 'Node.js',
  firebase: 'Firebase',
  expressjs: 'Express.js',
  express: 'Express.js',
  expo: 'Expo',
  typescipt: 'TypeScript',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  nextjs: 'Next.js',
  supabase: 'Supabase',
  postgresql: 'PostgreSQL',
  tailwindcss: 'Tailwind CSS',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  sql: 'SQL',
  php: 'PHP',
  python: 'Python',
  swift: 'Swift',
  swiftui: 'SwiftUI',
};

const getTechName = (label) => TECH_NAMES[label.toLowerCase()] || label;

const projects = [
  {
    id: 'tripsplit',
    title: 'TripSplit',
    role: 'Lead Mobile Developer',
    contribution: 'Built the React Native interface and shared-balance ledger with a Firebase-backed Node/Express API.',
    result: 'Groups can track shared bills and see balances reduced to fewer repayments.',
    description:
      'A cross-platform mobile application engineered to streamline group travel finances, split shared bills in real time, and calculate optimal repayment balances.',
    highlights: [
      'Engineered cross-platform mobile UI in React Native with Expo and TypeScript.',
      'Designed real-time shared balance ledger backed by Firebase and Node/Express REST API.',
      'Implemented automated balance reduction algorithms to minimize cross-user debts.',
    ],
    technologies: ['ReactNative', 'TypeScript', 'Node.js', 'ExpressJS', 'Firebase', 'Expo'],
    link: 'https://github.com/hungbenjamin402/tripsplit_capstone',
    image: '/assets/tripsplit2.jpeg',
    width: 401,
    height: 401,
    alt: 'TripSplit app icon',
    featured: true,
  },
  {
    id: 'tripsplit-ios',
    title: 'TripSplit iOS',
    role: 'iOS Engineer',
    description:
      'A native iOS application crafted with SwiftUI and modern Swift concurrency, featuring cloud sync, relational group ledger persistence, and offline caching.',
    highlights: [
      'Built fluid native iOS user interfaces utilizing SwiftUI and declarative state.',
      'Integrated Supabase (PostgreSQL) for user authentication and relational data sync.',
      'Engineered local persistence and automated debt calculation workflows.',
    ],
    technologies: ['Swift', 'SwiftUI', 'Supabase', 'PostgreSQL'],
    link: 'https://github.com/khoitran590/TripsplitIOS',
    image: '/assets/split.jpg',
    width: 1063,
    height: 2048,
    alt: 'TripSplit iOS expense splitting app interface',
    featured: false,
  },
  {
    id: 'movielly',
    title: 'Movielly',
    role: 'Full-Stack Developer',
    contribution: 'Built the responsive Next.js front end, Supabase data model, and TypeScript API integrations.',
    result: 'Viewers can discover films, keep watchlists, and publish reviews.',
    description:
      'A modern movie discovery and review platform where cinephiles explore trending releases, create personalized watchlists, and publish social reviews.',
    highlights: [
      'Architected responsive front end with Next.js and a customized Tailwind CSS design system.',
      'Designed relational database schema in Supabase for user ratings, watchlists, and activity feeds.',
      'Developed Express.js API endpoints with TypeScript and external movie API integrations.',
    ],
    technologies: ['NextJS', 'TypeScript', 'Supabase', 'ExpressJS', 'TailwindCSS'],
    link: 'https://github.com/khoitran590/movielly',
    image: '/assets/movielly.jpeg',
    width: 1200,
    height: 357,
    alt: 'Movielly movie reviews and ratings interface',
    featured: true,
  },
  {
    id: 'weather-app',
    title: 'Weather App 2.0',
    role: 'Front & Backend Developer',
    description:
      'A full-stack weather application providing live meteorological data, multi-day forecasting, and location-based weather tracking with caching.',
    highlights: [
      'Created dynamic, responsive React interface with real-time forecast visualization.',
      'Implemented Node.js server with MongoDB caching layer to reduce external API overhead.',
      'Integrated geocoding and live weather endpoints for global city searches.',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    link: 'https://github.com/khoitran590/WeatherApp-2.0',
    image: '/assets/weatherapp.jpg',
    width: 1200,
    height: 537,
    alt: 'Weather app forecast interface',
    featured: false,
  },
  {
    id: 'academic-events',
    title: 'Academic Event Mgmt',
    role: 'Database & Backend Lead',
    description:
      'An administrative web platform designed for universities to schedule, organize, and manage academic conferences, speakers, room constraints, and attendees.',
    highlights: [
      'Designed normalized MySQL schema with multi-table relational constraints and optimized queries.',
      'Built PHP backend handling role-based access control, scheduling conflicts, and event lifecycles.',
      'Engineered clean admin management dashboard using Tailwind CSS.',
    ],
    technologies: ['MySQL', 'PHP', 'TailwindCSS', 'SQL'],
    link: 'https://github.com/bwhelan212/academic-event-management-company',
    image: '/assets/academic.jpg',
    width: 800,
    height: 361,
    alt: 'Academic event management application interface',
    featured: false,
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird Arcade',
    role: 'Software Developer',
    description:
      'A faithful desktop arcade game reproduction built in Python featuring customized game loops, velocity physics, collision algorithms, and sprite rendering.',
    highlights: [
      'Implemented object-oriented game loop with delta-time frame management.',
      'Engineered 2D gravity physics, velocity curves, and precise bounding box collision detection.',
      'Added high-score local storage, animated sprites, and sound effect triggers.',
    ],
    technologies: ['Python'],
    link: 'https://github.com/sebavillani916/flappybird',
    image: '/assets/flappy.jpg',
    width: 800,
    height: 627,
    alt: 'Flappy Bird replication game screen',
    featured: false,
  },
];

const ProjectCard = ({ project }) => {
  const repositoryOwner = new URL(project.link).pathname.split('/')[1];
  return (
    <article className="surface-card flex h-full flex-col overflow-hidden text-white">
      <div className="aspect-[16/8] w-full overflow-hidden border-b border-white/10 bg-slate-950">
        <img
          src={project.image}
          alt={project.alt}
          width={project.width}
          height={project.height}
          className={cn(
            'h-full w-full',
            project.id === 'tripsplit' ? 'object-contain p-7 sm:p-12' : project.id === 'movielly' ? 'object-contain' : 'object-cover'
          )}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          <p className="text-sm font-medium accent-text">{project.role}</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">{project.title}</h3>
          <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed">
            <p><span className="font-semibold text-white">My contribution.</span> <span className="text-white/70">{project.contribution}</span></p>
            <p><span className="font-semibold text-white">What it enables.</span> <span className="text-white/70">{project.result}</span></p>
          </div>
          <details className="group mt-5 border-t border-white/10 pt-4">
            <summary className="w-fit cursor-pointer text-sm font-semibold text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]">
              Implementation details
            </summary>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-white/70 marker:text-[color:var(--accent)]">
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </details>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <p className="text-xs leading-relaxed text-white/60">
            {project.technologies.slice(0, 4).map(getTechName).join(' · ')}
          </p>
          <div className="flex flex-col items-start gap-0.5">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[color:var(--accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]">
              View source <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <span className="text-xs text-white/60">Repository: @{repositoryOwner}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const CompactProjectCard = ({ project }) => (
  <article className="surface-card group flex h-full flex-col overflow-hidden sm:flex-row">
    <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-slate-900 sm:aspect-auto sm:w-40 sm:shrink-0 sm:border-b-0 sm:border-r">
      <img
        src={project.image}
        alt={project.alt}
        width={project.width}
        height={project.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider accent-text">{project.role}</p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/65">{project.description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
        <p className="text-xs text-white/60">{project.technologies.slice(0, 3).map(getTechName).join(' · ')}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[color:var(--accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]">
          View project <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  </article>
);

const buildFilters = () => {
  const counts = new Map();
  projects.filter((project) => !project.featured).forEach((project) => {
    project.technologies.forEach((tech) => {
      const name = getTechName(tech);
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
};

const readFilterFromUrl = (filters) => {
  const requested = new URLSearchParams(window.location.search).get('tech');
  return requested && filters.includes(requested) ? requested : 'All';
};

const Projects = () => {
  const filters = useMemo(buildFilters, []);
  const [filter, setFilter] = useState(() => readFilterFromUrl(filters));

  useEffect(() => {
    const syncFilter = () => setFilter(readFilterFromUrl(filters));
    window.addEventListener('popstate', syncFilter);
    return () => window.removeEventListener('popstate', syncFilter);
  }, [filters]);

  const selectFilter = (name) => {
    if (name === filter) return;
    const url = new URL(window.location.href);
    if (name === 'All') url.searchParams.delete('tech');
    else url.searchParams.set('tech', name);
    window.history.pushState(null, '', url);
    setFilter(name);
  };

  const matches = (project) =>
    filter === 'All' || project.technologies.some((tech) => getTechName(tech) === filter);

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured && matches(project));

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <h2 id="projects-heading" className="page-heading font-extrabold tracking-tight text-white">
            Projects built around real user tasks.
          </h2>
          <p className="page-intro mt-4 text-white/65">
            Selected mobile and web work, followed by smaller projects across native apps, data, and software engineering.
          </p>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/60">Selected work</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>
        )}

        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">More projects</h3>
            <label className="flex items-center gap-3 text-sm text-white/70" htmlFor="project-filter">
              Technology
              <select
                id="project-filter"
                value={filter}
                onChange={(event) => selectFilter(event.target.value)}
                className="min-h-11 rounded-xl border border-white/15 bg-[color:var(--surface)] px-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
              >
                {['All', ...filters].map((name) => <option key={name} value={name}>{name === 'All' ? 'All technologies' : name}</option>)}
              </select>
            </label>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {otherProjects.length} more {otherProjects.length === 1 ? 'project' : 'projects'} shown
            {filter === 'All' ? '' : ` for ${filter}`}.
          </p>
          {otherProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {otherProjects.map((project) => <CompactProjectCard key={project.id} project={project} />)}
            </div>
          ) : (
            <p className="py-8 text-sm text-white/70">No more projects use {filter}. Choose another technology to keep browsing.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
