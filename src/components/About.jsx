// src/components/About.jsx
import React from 'react';
import { Download } from 'lucide-react';

const About = () => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        About Me
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4">Background</h3>
          <p className="text-gray-600 mb-6">
            I am a senior computer science student who is looking for work opportunities in the tech sector
          </p>
          <a
            href="#"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <Download size={20} className="mr-2" />
            Download Resume (PDF)
          </a>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Cal State Fullerton</h4>
              <p className="text-gray-600">BS in Computer Science, 2025</p>
              <h4 className="font-medium">Cypress College</h4>
              <p className="text-gray-600">Associate Degree, 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;