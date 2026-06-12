// src/components/Projects.jsx
import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import AnimatedHeading from './ScrollFx';
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
};

const getTech = (label) =>
  TECH_META[label.toLowerCase()] || { name: label, Icon: null, color: '#a3a3a3' };

const projects = [
  {
    title: 'TripSplit',
    subtitle: 'Group Expense Tracker',
    description: 'A travel-expenses app for efficient group expense management.',
    technologies: ['ReactNative', 'Node.js', 'Firebase', 'ExpressJS', 'Expo', 'TypeScipt'],
    link: 'https://github.com/hungbenjamin402/tripsplit_capstone',
  },
  {
    title: 'Movielly',
    subtitle: 'Movie Reviews & Ratings',
    description:
      'A movie rating and review platform where users can share what they have watched and what they think about it.',
    technologies: ['NextJS', 'ExpressJS', 'Supabase', 'TailwindCSS', 'TypeScipt'],
    link: 'https://github.com/khoitran590/movielly',
  },
  {
    title: 'Weather App',
    subtitle: 'Live Forecasts',
    description: 'A web application that displays current and forecasted weather.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/khoitran590/WeatherApp-2.0',
  },
  {
    title: 'Academic Event Management',
    subtitle: 'Event Scheduling Platform',
    description:
      'A web application that enables users to add, modify, and manage academic events with optimized SQL queries.',
    technologies: ['TailwindCSS', 'MySQL', 'PHP'],
    link: 'https://github.com/bwhelan212/academic-event-management-company',
  },
  {
    title: 'Flappy Bird Replication',
    subtitle: 'Arcade Game Clone',
    description: 'A replica of the famous Flappy Bird game built with Python.',
    technologies: ['Python'],
    link: 'https://github.com/sebavillani916/flappybird',
  },
];

const TechPill = ({ label }) => {
  const { name, Icon, color } = getTech(label);
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/10 border border-white/10 text-gray-200">
      {Icon && <Icon size={14} style={{ color }} />}
      {name}
    </span>
  );
};

// Interactive card with 3D tilt + dynamic glare driven by the cursor.
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const primary = getTech(project.technologies[0]);
  const PrimaryIcon = primary.Icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((y - centerY) / centerY) * -8;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="tilt-container">
      <div
        ref={cardRef}
        className="tilt-card group relative rounded-3xl p-8 text-white border border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/[0.04] shadow-2xl shadow-black/40"
      >
        {/* Header: icon + title/subtitle + github arrow */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg">
            {PrimaryIcon ? (
              <PrimaryIcon className="w-8 h-8 text-white" />
            ) : (
              <span className="text-xl font-bold">{project.title.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold leading-tight truncate">{project.title}</h2>
            <p className="text-indigo-300">{project.subtitle}</p>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="ml-auto shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <TechPill key={i} label={tech} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Background orbs */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/10 to-indigo-300/10 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/10 to-rose-300/10 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedHeading text="Projects" className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
