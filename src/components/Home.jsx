// src/components/Home.jsx
import React from 'react';
import { Download } from 'lucide-react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-10">
              <img
                src="/assets/52660347.jpg"
                alt="Profile"
                className="mx-auto rounded-3xl object-cover select-none shadow-sm"
                style={{ width: 640, height: 640 }}
                draggable={false}
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
              Peter Tran
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Software Engineer Graduate at Cal State Fullerton
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              A very normal person who enjoys designing stuff and making things work.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab && setActiveTab('contact')}
                className="rounded-full px-6 py-3 text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-colors"
              >
                Get in Touch
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('projects')}
                className="rounded-full px-6 py-3 border border-black/10 dark:border-white/20 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
    <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center text-gray-900 dark:text-white mb-12">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Background</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I am an aspiring software engineer with a passion for technology and innovation. I have a strong foundation in computer science principles and a keen interest in web development, mobile applications, and software engineering practices. 
                  I'm passionate about creating innovative solutions and enjoy the challenge of bringing ideas to life through code.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/Resume (1).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-black/10 dark:border-white/20 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Resume
                  </a>
                  <a
                    href="/Resume (1).pdf"
                    download="Peter_Tran_Resume.pdf"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-colors"
                  >
                    <Download size={20} className="mr-2" />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Education</h3>
                <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl">
                    <h4 className="font-medium text-gray-900 dark:text-white">Cal State Fullerton</h4>
                    <p className="text-gray-600 dark:text-gray-300">BS in Computer Science, 2025</p>
                  </div>
          <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl">
                    <h4 className="font-medium text-gray-900 dark:text-white">Cypress College</h4>
                    <p className="text-gray-600 dark:text-gray-300">Associate Degree, 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;