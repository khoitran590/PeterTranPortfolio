// src/components/Skills.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faReact, 
  faNode, 
  faPython,
  faPhp,
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode, faUsers, faBrain } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';

// Custom MongoDB Icon Component since Fontawesome does not have
const MongoDBIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 32 32">
    <path d="M15.9.087l.854 1.604c.192.296.4.558.645.802.715.715 1.394 1.464 2.004 2.266 1.447 1.9 2.423 4.01 3.12 6.292.418 1.394.645 2.824.662 4.27.07 4.323-1.412 8.035-4.4 11.12-.488.488-1.01.94-1.57 1.342-.296 0-.436-.227-.558-.436-.227-.383-.366-.82-.436-1.255-.105-.523-.174-1.046-.14-1.586v-.244C16.057 24.21 15.796.21 15.9.087z" fill="#599636"/>
    <path d="M15.9.034c-.035-.07-.07-.017-.105.017.017.35-.105.662-.296.96-.21.296-.488.523-.767.767-1.55 1.342-2.77 2.963-3.747 4.776-1.3 2.44-1.97 5.055-2.16 7.808-.087.993.314 4.497.627 5.508.854 2.684 2.388 4.933 4.375 6.885.488.47 1.01.906 1.55 1.325.157 0 .174-.14.21-.244a4.78 4.78 0 0 0 .157-.68l.35-2.614L15.9.034z" fill="#6cac48"/>
    <path d="M16.754 28.845c.035-.4.227-.732.436-1.063-.21-.087-.366-.26-.488-.453-.105-.174-.192-.383-.26-.575-.244-.732-.296-1.5-.366-2.248v-.453c-.087.07-.105.662-.105.75a17.37 17.37 0 0 1-.314 2.353c-.052.314-.087.627-.28.906 0 .035 0 .07.017.122.314.924.4 1.865.453 2.824v.35c0 .418-.017.33.33.47.14.052.296.07.436.174.105 0 .122-.087.122-.157l-.052-.575v-1.604c-.017-.28.035-.558.07-.82z" fill="#c2bfbf"/>
  </svg>
);

// Custom PostgreSQL Icon Component since Fontawesome does not have
const PostgreSQLIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 32 32">
    <path d="M16 0c-4.1 0-7.4 1.3-9.2 3.4-2 2.1-2.3 4.5-2.3 6.3v1l0.1 1c0.2 1.4 0.5 2.4 0.9 3.3 0.4 0.9 0.9 1.5 1.4 2 0.5 0.5 1.1 0.8 1.6 1.1 0.3 0.2 0.6 0.3 0.9 0.4-0.3 0.9-0.5 1.8-0.6 2.3-0.2 0.7-0.2 1.4 0.1 1.9 0.1 0.2 0.3 0.4 0.6 0.5 0.3 0.1 0.6 0.2 0.9 0.1 0.7-0.1 1.5-0.5 2.4-1.2 0.9-0.7 1.7-1.6 2.5-2.4l0.1-0.1c0.5 0.1 1 0.2 1.6 0.2 1.3 0 2.6-0.2 3.8-0.7 1.2-0.5 2.3-1.2 3.2-2.2 0.9-0.9 1.6-2 2-3.2 0.4-1.2 0.7-2.5 0.7-3.8 0-1.3-0.2-2.6-0.7-3.8-0.5-1.2-1.2-2.3-2.2-3.2-0.9-0.9-2-1.6-3.2-2-1.2-0.5-2.5-0.7-3.8-0.7z" fill="#336791"/>
    <path d="M16.8 25.3c-0.4 0.4-0.8 0.8-1.2 1.1-0.4 0.3-0.8 0.6-1.2 0.8-0.4 0.2-0.8 0.3-1.2 0.3-0.4 0-0.7-0.1-1-0.3-0.3-0.2-0.5-0.5-0.6-0.8-0.1-0.4-0.1-0.8 0-1.3 0.1-0.5 0.3-1 0.5-1.6 0.2-0.5 0.5-1.1 0.8-1.6s0.6-1.1 1-1.6c0.3-0.5 0.7-1 1-1.4 0.4-0.4 0.7-0.8 1.1-1.1 0.4-0.3 0.7-0.5 1.1-0.7 0.3-0.1 0.7-0.2 1-0.2 0.3 0 0.6 0.1 0.8 0.2s0.4 0.3 0.5 0.6c0.1 0.2 0.2 0.5 0.2 0.8 0 0.3-0.1 0.6-0.2 0.9-0.1 0.3-0.3 0.7-0.5 1-0.2 0.4-0.5 0.7-0.8 1.1-0.3 0.4-0.6 0.7-1 1.1-0.3 0.3-0.7 0.7-1.1 1z" fill="#336791"/>
  </svg>
);

// Custom C++ Icon Component since Fontawesome does not have
const CppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 32 32">
    <path d="M16 4.046c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z" fill="#00599C"/>
    <path d="M18.265 19.137h-4.53v-1.804h4.53v1.804zm-2.265-7.091c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" fill="#00599C"/>
    <path d="M22 14h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm4-2h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2v-2h2v-2h-2v2h-2v-2z" fill="#00599C"/>
  </svg>
);

//Custom Tailwind CSS Icon Component since Fontawesome does not have
const TailwindIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 32 32">
    <path 
      d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z" 
      fill="#38BDF8"
    />
  </svg>
);

// Custom React Native Icon Component
const ReactNativeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="2" fill="#61DAFB"/>
    <circle cx="16" cy="16" r="6" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
    <ellipse cx="16" cy="16" rx="12" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="12" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(-60 16 16)"/>
    <ellipse cx="16" cy="16" rx="12" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Custom Firebase Icon Component
const FirebaseIcon = () => (
  <img 
    src="/assets/logomark_FullColor.png" 
    alt="Firebase" 
    className="w-4 h-4 object-contain"
  />
);

const Skills = () => {
  const skillCategories = [
    {
      name: 'Frontend Development',
      skills: [
        { name: 'HTML5', icon: faHtml5 },
        { name: 'CSS3', icon: faCss3Alt },
        { name: 'JavaScript', icon: faJs },
        { name: 'React', icon: faReact },
        { name: 'React Native', icon: 'custom', CustomIcon: ReactNativeIcon },
        { name: 'Tailwind CSS', icon: 'custom', CustomIcon: TailwindIcon },
        { name: 'TypeScript', icon: faCode },
        { name: 'C++', icon: 'custom', CustomIcon: CppIcon },
        { name: 'Python', icon: faPython },
        { name: 'SQL', icon: faDatabase }
      ],
    },
    {
      name: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: faNode },
        { name: 'Python', icon: faPython },
        { name: 'PHP', icon: faPhp },
        { name: 'MongoDB', icon: 'custom', CustomIcon: MongoDBIcon },
        { name: 'PostgreSQL', icon: 'custom', CustomIcon: PostgreSQLIcon },
        { name: 'Firebase', icon: 'custom', CustomIcon: FirebaseIcon }
      ],
    },
    {
      name: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', icon: faBrain },
        { name: 'Team Leadership', icon: faUsers },
        { name: 'Communication', icon: faUsers },
        { name: 'Time Management', icon: faClock }
      ],
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Skills
        </h2>
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-all duration-200 hover:shadow-md hover:transform hover:scale-105"
                  >
                    {skill.icon === 'custom' ? (
                      <skill.CustomIcon />
                    ) : (
                      <FontAwesomeIcon icon={skill.icon} className="text-gray-600 dark:text-gray-300" />
                    )}
                    {skill.name}
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