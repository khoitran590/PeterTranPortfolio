// src/components/Projects.jsx
import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Smartphone,
  Database,
  CheckCircle2,
} from 'lucide-react';
import {
  SiReact,
  SiNodedotjs,
  SiFirebase,
  SiExpress,
  SiExpo,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPython,
  SiSwift,
  SiPostgresql,
} from 'react-icons/si';
import { cn } from '../lib/utils';

// Map each tech label to a display name, icon and brand color.
const TECH_META = {
  reactnative: { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
  react: { name: 'React', Icon: SiReact, color: '#61DAFB' },
  'node.js': { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  nodejs: { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  firebase: { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  expressjs: { name: 'Express.js', Icon: SiExpress, color: '#ffffff' },
  express: { name: 'Express.js', Icon: SiExpress, color: '#ffffff' },
  expo: { name: 'Expo', Icon: SiExpo, color: '#ffffff' },
  typescipt: { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  typescript: { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  javascript: { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  nextjs: { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff' },
  supabase: { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
  postgresql: { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  tailwindcss: { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
  mongodb: { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  mysql: { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  sql: { name: 'SQL', Icon: SiMysql, color: '#4479A1' },
  php: { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
  python: { name: 'Python', Icon: SiPython, color: '#3776AB' },
  swift: { name: 'Swift', Icon: SiSwift, color: '#FA7343' },
  swiftui: { name: 'SwiftUI', Icon: SiSwift, color: '#FA7343' },
};

const getTech = (label) =>
  TECH_META[label.toLowerCase()] || { name: label, Icon: null, color: '#a3a3a3' };

const projects = [
  {
    id: 'tripsplit',
    title: 'TripSplit',
    subtitle: 'Group Expense Tracker & Splitter',
    category: 'Full-Stack Mobile Capstone',
    role: 'Lead Mobile Developer',
    description:
      'A cross-platform mobile application engineered to streamline group travel finances, split shared bills in real time, and calculate optimal repayment balances.',
    highlights: [
      'Engineered cross-platform mobile UI in React Native with Expo and TypeScript.',
      'Designed real-time shared balance ledger backed by Firebase and Node/Express REST API.',
      'Implemented automated balance reduction algorithms to minimize cross-user debts.',
    ],
    technologies: ['ReactNative', 'TypeScript', 'Node.js', 'ExpressJS', 'Firebase', 'Expo'],
    link: 'https://github.com/hungbenjamin402/tripsplit_capstone',
    demo: '',
    image: '/assets/tripsplit2.jpeg',
    width: 401,
    height: 401,
    alt: 'TripSplit group expense tracker interface',
    featured: true,
  },
  {
    id: 'tripsplit-ios',
    title: 'TripSplit iOS',
    subtitle: 'Native iOS Travel Expense App',
    category: 'Native iOS & Cloud Database',
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
    demo: '',
    image: '/assets/split.jpg',
    width: 1063,
    height: 2048,
    alt: 'TripSplit iOS expense splitting app interface',
    featured: true,
  },
  {
    id: 'movielly',
    title: 'Movielly',
    subtitle: 'Movie Discovery & Social Reviews',
    category: 'Full-Stack Web Platform',
    role: 'Full-Stack Developer',
    description:
      'A modern movie discovery and review platform where cinephiles explore trending releases, create personalized watchlists, and publish social reviews.',
    highlights: [
      'Architected responsive front end with Next.js and a customized Tailwind CSS design system.',
      'Designed relational database schema in Supabase for user ratings, watchlists, and activity feeds.',
      'Developed Express.js API endpoints with TypeScript and external movie API integrations.',
    ],
    technologies: ['NextJS', 'TypeScript', 'Supabase', 'ExpressJS', 'TailwindCSS'],
    link: 'https://github.com/khoitran590/movielly',
    demo: '',
    image: '/assets/movielly.jpeg',
    width: 1200,
    height: 357,
    alt: 'Movielly movie reviews and ratings interface',
    featured: true,
  },
  {
    id: 'weather-app',
    title: 'Weather App 2.0',
    subtitle: 'Real-Time Forecasts & Analytics',
    category: 'Full-Stack Web Application',
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
    demo: '',
    image: '/assets/weatherapp.jpg',
    width: 1200,
    height: 537,
    alt: 'Weather app forecast interface',
    featured: false,
  },
  {
    id: 'academic-events',
    title: 'Academic Event Mgmt',
    subtitle: 'Conference & Resource Platform',
    category: 'Relational Database System',
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
    demo: '',
    image: '/assets/academic.jpg',
    width: 800,
    height: 361,
    alt: 'Academic event management application interface',
    featured: false,
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird Arcade',
    subtitle: '2D Game Engine & Physics Simulation',
    category: 'Python Software Engineering',
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
    demo: '',
    image: '/assets/flappy.jpg',
    width: 800,
    height: 627,
    alt: 'Flappy Bird replication game screen',
    featured: false,
  },
];

const recruiterHighlights = [
  {
    icon: Smartphone,
    label: 'Mobile Specialization',
    detail: 'Native iOS (SwiftUI) & Cross-Platform (React Native)',
  },
  {
    icon: Layers,
    label: 'Full-Stack Architecture',
    detail: 'React, Next.js, Node.js, Express & TypeScript',
  },
  {
    icon: Database,
    label: 'Relational & Cloud DBs',
    detail: 'Supabase, PostgreSQL, Firebase, MongoDB & MySQL',
  },
  {
    icon: Code2,
    label: 'Open Source Repositories',
    detail: 'Documented codebases & clean git commit histories',
  },
];

const TechPill = ({ label }) => {
  const { name, Icon, color } = getTech(label);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-gray-200 backdrop-blur-sm transition-colors hover:bg-white/10">
      {Icon && <Icon size={13} style={{ color }} aria-hidden="true" />}
      {name}
    </span>
  );
};

const ProjectCard = ({ project }) => {
  const primary = getTech(project.technologies[0]);
  const PrimaryIcon = primary.Icon;
  const hasDemo = Boolean(project.demo);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
      {/* Uniform Media Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-900">
        <img
          src={project.image}
          alt={project.alt}
          width={project.width}
          height={project.height}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"
          aria-hidden="true"
        />

        {/* Top Badges */}
        <div className="absolute left-3.5 top-3.5 right-3.5 flex items-center justify-between gap-2">
          <span className="keep-fg inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            {project.category}
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white/90 backdrop-blur transition-transform duration-200 hover:scale-110 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
          >
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Primary Stack Badge */}
        <div className="keep-fg absolute bottom-3 left-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {PrimaryIcon ? (
            <PrimaryIcon size={13} style={{ color: primary.color }} aria-hidden="true" />
          ) : null}
          <span>{primary.name}</span>
        </div>
      </div>

      {/* Card Body - Flex Column for Guaranteed Equal Height Alignment */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Subtitle & Title */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider accent-text">{project.subtitle}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[color:var(--accent-soft)]">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-white/70">{project.description}</p>

          {/* Recruiter Highlights */}
          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">Key Engineering Accomplishments</p>
            <ul className="mt-2 space-y-2 text-xs leading-normal text-white/75">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 accent-text" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Technologies & Actions */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
            >
              <Github size={16} aria-hidden="true" />
              View GitHub Repo
            </a>
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
              >
                <ExternalLink size={15} aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const buildFilters = () => {
  const counts = new Map();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      const { name } = getTech(tech);
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
  });
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = useMemo(buildFilters, []);

  const matches = (project) =>
    filter === 'All' || project.technologies.some((tech) => getTech(tech).name === filter);

  const visibleProjects = projects.filter(matches);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative scroll-mt-24 py-20 sm:py-24">
      {/* Background ambient orbs */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/10 to-indigo-300/10 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/10 to-rose-300/10 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Featured Engineering Work</p>
          <h2 id="projects-heading" className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Projects built around real user tasks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            A comprehensive portfolio of web and mobile applications demonstrating end-to-end engineering,
            clean architecture, database design, and intuitive user experiences.
          </p>
        </div>

        {/* Recruiter Highlights Quick-Scan Bar */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {recruiterHighlights.map(({ icon: Icon, label, detail }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--accent)]">
                <Icon size={20} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{label}</p>
                <p className="text-[11px] text-white/60 truncate">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Navigation */}
        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by technology">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-white/50">Filter:</span>
          {['All', ...filters].map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]',
                  isActive
                    ? 'keep-fg border-transparent bg-[color:var(--accent)] text-white shadow-md'
                    : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {name === 'All' ? `All Projects (${projects.length})` : name}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'} shown
          {filter === 'All' ? '' : ` for ${filter}`}.
        </p>

        {/* Uniform Grid for All Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/65">
            <Sparkles className="mx-auto h-8 w-8 text-white/40 mb-3" />
            <p className="text-base font-semibold text-white">No projects found matching &ldquo;{filter}&rdquo;.</p>
            <button
              onClick={() => setFilter('All')}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
