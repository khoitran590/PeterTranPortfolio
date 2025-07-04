// src/components/Home.jsx
import React from 'react';

const Home = () => (
  <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
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
          <a
            href="#contact"
            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors transform hover:scale-105"
          >
            View Projects
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Home;