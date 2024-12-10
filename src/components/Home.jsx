// src/components/Home.jsx
import React from 'react';

const Home = () => (
  <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="/assets/52660347.jpg"
            alt="Profile"
            className="w-33 h-33 rounded-xl mx-auto shadow-lg object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Peter Tran
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Software Engineering Student at Cal State Fullerton
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Passionate about creating projects that is not only visually pleasing but also well function
          Specializing in React, Node.js, and modern web technologies.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors transform hover:scale-105"
          >
            View Projects
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Home;