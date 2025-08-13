// src/components/Projects.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Weather App',
      description: 'A web application that displays weather',
      image: '/assets/weatherapp.png',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/khoitran590/WeatherApp-2.0', 
    },
    {
      title: 'Academic Event Management',
      description: 'A web application that enables users to add, modify, and manage academic events with optimized SQL queries',
      image: '/assets/academic.jpg',
      technologies: ['TailwindCSS', 'MySQL', 'PHP'],
      link: 'https://github.com/bwhelan212/academic-event-management-company', 
    },
    {
      title: 'Flappy Bird Replication',
      description: 'A replica of the famous Flappy Bird game using Python',
      image: '/assets/flappy.jpg',
      technologies: ['Python'],
      link: 'https://github.com/sebavillani916/flappybird',
    },
    {
      title: 'TripSplit',
      description: 'A travel-expenses for efficient group expense management',
      image: '/assets/tripsplit2.jpeg',
      technologies: ['ReactNative', 'Node.js', 'Firebase', 'ExpressJS', 'Expo', 'TypeScipt'],
      link: 'https://github.com/hungbenjamin402/tripsplit_capstone',
    },
  ];

  const TechPill = ({ label }) => (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-white/80 dark:bg-gray-700/60 border border-black/5 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-sm">
      {label}
    </span>
  );

  return (
  <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Background orbs */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/30 to-indigo-300/20 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/20 to-rose-300/20 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h2>
        </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
      className="relative group rounded-3xl p-4 sm:p-5 border border-black/5 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/70 dark:bg-gray-800/50 shadow-sm hover:shadow-md transform-gpu [will-change:transform] motion-safe:transition-[box-shadow,transform,opacity] motion-safe:duration-200 motion-reduce:transition-none"
            >
              {/* halo */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-sky-400/25 to-transparent opacity-0 group-hover:opacity-100 blur-xl md:blur-2xl motion-safe:transition-opacity" />

              {/* image tile */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-gray-100 dark:bg-gray-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transform-gpu motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 motion-safe:transition-opacity" />
              </div>

              {/* content */}
              <div className="mt-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow hover:brightness-110 motion-safe:transition-colors"
                  >
                    View
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <TechPill key={techIndex} label={tech} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;