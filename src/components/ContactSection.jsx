import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden scroll-mt-20 bg-[#e3f2fd] dark:bg-[#0d1b2a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-200/30 to-transparent blur-3xl dark:from-indigo-500/10" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Let's work together</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-prose">Have a project or role in mind? Drop a line and I'll get back within 1–2 days.</p>
            <div className="mt-8 space-y-3">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Connect With Me</h3>
              <a href="https://github.com/khoitran590" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github size={20} className="mr-3" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/peterkhoitran/?profileId=ACoAACGBcowB9vVKOLWHOZfsW5ygkiZQdDbbSEs" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Linkedin size={20} className="mr-3" /> LinkedIn
              </a>
              <a href="mailto:khoitran590@gmail.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Mail size={20} className="mr-3" /> khoitran590@gmail.com
              </a>
            </div>
          </div>
          <div className="glass-liquid glass-edge-light rounded-[1.75rem] p-6 md:p-8 bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
            <ContactForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
