// src/components/Home.jsx
import React from 'react';
import { Download } from 'lucide-react';

const Home = ({ setActiveTab }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
    {/* Hero Section */}
    <section className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <img
              src="/assets/52660347.jpg"
              alt="Profile"
              className="w-25 h-25 rounded-xl mx-auto shadow-lg dark:shadow-gray-700 object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Peter Tran
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Senior Software Engineering Student at Cal State Fullerton
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            A very normal person who enjoys designing stuff
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab && setActiveTab('contact')}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Get in Touch
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('projects')}
              className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section className="py-20 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Background</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I am a senior computer science student who is looking for work opportunities in the tech sector. 
                I'm passionate about creating innovative solutions and enjoy the challenge of bringing ideas to life through code.
              </p>
              <button
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-600 px-3 py-2 rounded-lg"
              >
                <Download size={20} className="mr-2" />
                Download Resume (PDF)
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cal State Fullerton</h4>
                  <p className="text-gray-600 dark:text-gray-300">BS in Computer Science, 2025</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
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

export default Home;