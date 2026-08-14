// src/components/Projects.jsx
import React, { useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import {
  SiReact,
  SiNodedotjs,
  SiFirebase,
  SiExpress,
  SiExpo,
  SiTypescript,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPython,
  SiSwift,
} from 'react-icons/si';
import { cn } from '../lib/utils';

// Map each tech label to a display name, icon and brand color.
const TECH_META = {
  reactnative: { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
  react: { name: 'React', Icon: SiReact, color: '#61DAFB' },
  'node.js': { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  firebase: { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  expressjs: { name: 'Express.js', Icon: SiExpress, color: '#ffffff' },
  expo: { name: 'Expo', Icon: SiExpo, color: '#ffffff' },
  typescipt: { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  typescript: { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  nextjs: { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff' },
  supabase: { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
  tailwindcss: { name: 'TailwindCSS', Icon: SiTailwindcss, color: '#38BDF8' },
  mongodb: { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  mysql: { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  php: { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
  python: { name: 'Python', Icon: SiPython, color: '#3776AB' },
  swift: { name: 'Swift', Icon: SiSwift, color: '#FA7343' },
  swiftui: { name: 'SwiftUI', Icon: SiSwift, color: '#FA7343' },
};

const getTech = (label) =>
  TECH_META[label.toLowerCase()] || { name: label, Icon: null, color: '#a3a3a3' };

// `demo` is the deployed URL. Fill one in and the card promotes "Live demo" to
// the primary action -- the first thing most reviewers look for.
// `width`/`height` are intrinsic pixels so the browser can reserve the right
// box before CSS resolves.
const projects = [
  {
    title: 'TripSplit',
    subtitle: 'Group Expense Tracker',
    description: 'A travel-expenses app designed to make group expense management easier.',
    highlights: ['Cross-platform mobile flow', 'Firebase-backed data', 'Express API layer'],
    technologies: ['ReactNative', 'Node.js', 'Firebase', 'ExpressJS', 'Expo', 'TypeScript'],
    link: 'https://github.com/hungbenjamin402/tripsplit_capstone',
    demo: '',
    image: '/assets/tripsplit2.jpeg',
    width: 401,
    height: 401,
    alt: 'TripSplit group expense tracker interface',
    featured: true,
  },
  {
    title: 'TripSplit iOS',
    subtitle: 'iOS Expense Splitting App',
    description: 'Native iOS application for splitting travel expenses and managing group payments.',
    highlights: ['Native iOS interface', 'Shared expense management', 'Supabase-backed product'],
    technologies: ['Swift', 'SwiftUI', 'Supabase'],
    link: 'https://github.com/khoitran590/TripsplitIOS',
    demo: '',
    image: '/assets/split.jpg',
    width: 1063,
    height: 2048,
    alt: 'TripSplit iOS expense splitting app interface',
    featured: true,
  },
  {
    title: 'Movielly',
    subtitle: 'Movie Reviews & Ratings',
    description:
      'A movie rating and review platform where users can share what they have watched and what they think about it.',
    highlights: ['Social review experience', 'Next.js front end', 'Supabase data platform'],
    technologies: ['NextJS', 'ExpressJS', 'Supabase', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/khoitran590/movielly',
    demo: '',
    image: '/assets/movielly.jpeg',
    width: 1200,
    height: 357,
    alt: 'Movielly movie reviews and ratings interface',
    featured: true,
  },
  {
    title: 'Weather App',
    subtitle: 'Live Forecasts',
    description: 'A web application that displays current and forecasted weather.',
    highlights: ['Current conditions', 'Forecast-focused interface', 'MongoDB-backed application'],
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/khoitran590/WeatherApp-2.0',
    demo: '',
    image: '/assets/weatherapp.jpg',
    width: 1200,
    height: 537,
    alt: 'Weather app forecast interface',
  },
  {
    title: 'Academic Event Management',
    subtitle: 'Event Scheduling Platform',
    description:
      'A web application that enables users to add, modify, and manage academic events with optimized SQL queries.',
    highlights: ['Event management workflows', 'Relational data modeling', 'Optimized SQL queries'],
    technologies: ['TailwindCSS', 'MySQL', 'PHP'],
    link: 'https://github.com/bwhelan212/academic-event-management-company',
    demo: '',
    image: '/assets/academic.jpg',
    width: 800,
    height: 361,
    alt: 'Academic event management application interface',
  },
  {
    title: 'Flappy Bird Replication',
    subtitle: 'Arcade Game Clone',
    description: 'A replica of the famous Flappy Bird game built with Python.',
    highlights: ['Game loop implementation', 'Interactive Python project', 'Classic arcade mechanics'],
    technologies: ['Python'],
    link: 'https://github.com/sebavillani916/flappybird',
    demo: '',
    image: '/assets/flappy.jpg',
    width: 800,
    height: 627,
    alt: 'Flappy Bird replication game screen',
  },
];

const TechPill = ({ label }) => {
  const { name, Icon, color } = getTech(label);
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/10 text-gray-200">
      {Icon && <Icon size={14} style={{ color }} />}
      {name}
    </span>
  );
};

const ProjectCard = ({ project, spotlight = false }) => {
  const primary = getTech(project.technologies[0]);
  const PrimaryIcon = primary.Icon;
  const hasDemo = Boolean(project.demo);

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1',
        // The spotlight card runs its image beside the copy instead of above it.
        spotlight && 'lg:flex-row'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden border-b border-white/10 bg-slate-900',
          spotlight ? 'aspect-[16/9] lg:aspect-auto lg:w-1/2 lg:border-b-0 lg:border-r' : 'aspect-[16/9]'
        )}
      >
        <img
          src={project.image}
          alt={project.alt}
          width={project.width}
          height={project.height}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={project.featured ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" aria-hidden="true" />
        <div className="keep-fg absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {PrimaryIcon ? (
            <PrimaryIcon size={14} style={{ color: primary.color }} aria-hidden="true" />
          ) : null}
          {primary.name}
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col p-6', spotlight && 'lg:w-1/2 lg:justify-center')}>
        <div className="flex items-start gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold accent-text">{project.subtitle}</p>
            <h3 className={cn('mt-1 font-bold leading-tight', spotlight ? 'text-3xl' : 'text-2xl')}>
              {project.title}
            </h3>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source on GitHub`}
            className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>

        <p className="mt-4 text-base leading-relaxed text-white/70">{project.description}</p>

        <ul className="mt-5 space-y-2 text-sm text-white/70">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full accent-bullet" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        {/* mt-auto pins the actions to the bottom so cards in a row line up even
            when their highlight lists differ in length. */}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]',
                hasDemo
                  ? 'rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10'
                  : 'text-white hover:accent-text'
              )}
            >
              <Github size={hasDemo ? 16 : 18} aria-hidden="true" />
              {hasDemo ? 'Source' : 'View source on GitHub'}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

// Only technologies that span more than one project. Listing all sixteen tags
// would put more chips on screen than there are projects to filter, and a
// filter that always returns a single card is not worth the row it occupies.
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

  const visible = projects.filter(matches);
  const featuredProjects = visible.filter((project) => project.featured);
  const additionalProjects = visible.filter((project) => !project.featured);
  const showSpotlight = filter === 'All' && featuredProjects.length === 3;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative scroll-mt-24 py-20 sm:py-24">
      {/* Background orbs */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/10 to-indigo-300/10 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/10 to-rose-300/10 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="section-kicker">Selected work</p>
          <h2 id="projects-heading" className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Products built around real user tasks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            A selection of web and mobile projects that show how I approach product
            experiences, application architecture, and data-backed features.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          {['All', ...filters].map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]',
                  isActive
                    ? 'keep-fg border-transparent bg-[color:var(--accent)] text-white'
                    : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {name}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
          {filter === 'All' ? '' : ` for ${filter}`}.
        </p>

        {/* Unfiltered, the newest project leads at full width and the other two
            sit beside it. Under a filter the grid stays uniform, so results are
            comparable rather than implying a ranking the filter did not ask for. */}
        {showSpotlight ? (
          <div className="grid gap-6">
            <ProjectCard project={featuredProjects[0]} spotlight />
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.slice(1).map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        ) : (
          featuredProjects.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )
        )}

        {additionalProjects.length > 0 && (
          <div className={cn(featuredProjects.length > 0 && 'mt-16 border-t border-white/10 pt-10')}>
            <h3 className="text-2xl font-bold text-white">More projects</h3>
            <p className="mt-2 text-white/65">Additional work across web development, databases, and Python.</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {additionalProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {visible.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/65">
            No projects use {filter} yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
