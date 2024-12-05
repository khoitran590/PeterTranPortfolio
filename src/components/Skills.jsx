// src/components/Skills.jsx
import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      name: 'Frontend Development',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Typescript', 'C++', 'Python', 'SQL'],
    },
    {
      name: 'Backend Development',
      skills: ['Node.js', 'Python', 'PHP', 'MongoDB', 'PostgreSQL', 'RESTful APIs'],
    },
    {
      name: 'Soft Skills',
      skills: ['Problem Solving', 'Team Leadership', 'Communication', 'Agile/Scrum'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;