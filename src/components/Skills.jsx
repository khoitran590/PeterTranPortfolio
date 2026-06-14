// src/components/Skills.jsx – bento grid layout
import React from 'react';
import { Monitor, Server, Users, Code2 } from 'lucide-react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiCplusplus,
  SiPython,
  SiNodedotjs,
  SiPhp,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiMysql,
} from 'react-icons/si';
import { cn } from '../lib/utils';
import AnimatedHeading from './ScrollFx';

const bentoItems = [
  {
    title: 'Frontend Development',
    meta: 'UI / UX',
    description:
      'Building responsive, accessible interfaces with modern frameworks and clean component architecture.',
    icon: <Monitor className="w-4 h-4 text-sky-400" />,
    status: 'Featured',
    skills: [
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
    ],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: 'Languages',
    meta: 'Core',
    description: 'General-purpose languages for systems, scripting, and data.',
    icon: <Code2 className="w-4 h-4 text-amber-400" />,
    status: 'Active',
    skills: [
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
      { name: 'SQL', Icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'Soft Skills',
    meta: 'People',
    description:
      'Leading teams, communicating clearly, and solving problems under pressure.',
    icon: <Users className="w-4 h-4 text-fuchsia-400" />,
    status: 'Active',
    skills: [
      { name: 'Problem Solving' },
      { name: 'Team Leadership' },
      { name: 'Communication' },
      { name: 'Time Management' },
    ],
  },
  {
    title: 'Backend Development',
    meta: 'APIs / Data',
    description:
      'Designing APIs and data layers with relational and document databases.',
    icon: <Server className="w-4 h-4 text-emerald-400" />,
    status: 'Featured',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
    ],
    colSpan: 2,
  },
];

const BentoGrid = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto">
    {items.map((item, index) => (
      <div
        key={index}
        className={cn(
          'group relative p-5 rounded-xl overflow-hidden transition-all duration-300',
          'border border-white/10 bg-white/[0.03]',
          'hover:shadow-[0_2px_12px_rgba(255,255,255,0.05)]',
          'hover:-translate-y-0.5 will-change-transform',
          item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1',
          item.hasPersistentHover &&
            '-translate-y-0.5 shadow-[0_2px_12px_rgba(255,255,255,0.05)]'
        )}
      >
        {/* dotted texture overlay */}
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            item.hasPersistentHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
        </div>

        <div className="relative flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 transition-all duration-300">
              {item.icon}
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm bg-white/10 text-gray-300 transition-colors duration-300 group-hover:bg-white/20">
              {item.status || 'Active'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-100 tracking-tight text-[20px]">
              {item.title}
              <span className="ml-2 text-base text-gray-400 font-normal">
                {item.meta}
              </span>
            </h3>
            <p className="text-base font-medium text-gray-300 leading-snug">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {item.skills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-semibold text-gray-300 bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                {skill.Icon && <skill.Icon size={13} style={{ color: skill.color }} />}
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* gradient border glow */}
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/10 to-transparent transition-opacity duration-300',
            item.hasPersistentHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        />
      </div>
    ))}
  </div>
);

const Skills = () => {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedHeading text="Skills" className="mt-4" />
        </div>

        <BentoGrid items={bentoItems} />
      </div>
    </section>
  );
};

export default Skills;
