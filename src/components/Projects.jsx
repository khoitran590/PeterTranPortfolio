// src/components/Projects.jsx
import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
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

const projects = [
  {
    title: 'TripSplit',
    subtitle: 'Group Expense Tracker',
    description: 'A travel-expenses app designed to make group expense management easier.',
    highlights: ['Cross-platform mobile flow', 'Firebase-backed data', 'Express API layer'],
    technologies: ['ReactNative', 'Node.js', 'Firebase', 'ExpressJS', 'Expo', 'TypeScript'],
    link: 'https://github.com/hungbenjamin402/tripsplit_capstone',
    image: '/assets/tripsplit2.jpeg',
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
    image: '/assets/split.jpg',
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
    image: '/assets/movielly.jpeg',
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
    image: '/assets/weatherapp.png',
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
    image: '/assets/academic.jpg',
    alt: 'Academic event management application interface',
  },
  {
    title: 'Flappy Bird Replication',
    subtitle: 'Arcade Game Clone',
    description: 'A replica of the famous Flappy Bird game built with Python.',
    highlights: ['Game loop implementation', 'Interactive Python project', 'Classic arcade mechanics'],
    technologies: ['Python'],
    link: 'https://github.com/sebavillani916/flappybird',
    image: '/assets/flappy.jpg',
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

const ProjectCard = ({ project }) => {
  const primary = getTech(project.technologies[0]);
  const PrimaryIcon = primary.Icon;

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-slate-900">
        <img
          src={project.image}
          alt={project.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={project.featured ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {PrimaryIcon ? (
            <PrimaryIcon size={14} style={{ color: primary.color }} aria-hidden="true" />
          ) : null}
          {primary.name}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-indigo-300">{project.subtitle}</p>
            <h3 className="mt-1 text-2xl font-bold leading-tight">{project.title}</h3>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source on GitHub`}
            className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>

        <p className="mt-4 text-base leading-relaxed text-white/70">{project.description}</p>

        <ul className="mt-5 space-y-2 text-sm text-white/70">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          <Github size={18} aria-hidden="true" />
          View source on GitHub
        </a>
      </div>
    </article>
  );
};

const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured);
  const additionalProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative scroll-mt-24 py-20 sm:py-24">
      {/* Background orbs */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/10 to-indigo-300/10 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/10 to-rose-300/10 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="section-kicker">Selected work</p>
          <h2 id="projects-heading" className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Products built around real user tasks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            A selection of web and mobile projects that show how I approach product
            experiences, application architecture, and data-backed features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <h3 className="text-2xl font-bold text-white">More projects</h3>
          <p className="mt-2 text-white/65">Additional work across web development, databases, and Python.</p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
