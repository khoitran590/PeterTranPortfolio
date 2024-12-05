// src/components/Projects.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Action Figures Checklist',
      description: 'A web platform using ReactJS for frontend and Node.js with MongoDB for backend',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#',
    },
    {
      title: 'Academic Event Management',
      description: 'A web applicatioon that enables users to add, modify, and manage academic events with optimized SQL queries',
      image: '/assets/academic.jpg',
      technologies: ['TailwindCSS', 'MySQL'],
      link: '#',
    },
    {
      title: 'Flappy Bird Replication',
      description: 'A replica of the famous Flappy Bird game using Unity and C#',
      image: '/assets/flappy.jpg',
      technologies: ['C#', 'Unity'],
      link: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  View Project
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;