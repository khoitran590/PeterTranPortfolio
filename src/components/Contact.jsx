// src/components/Contact.jsx
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/30 to-indigo-300/20 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/20 to-rose-300/20 blur-2xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Get in Touch</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/70 dark:bg-gray-800/50 shadow-sm">
            <ContactForm />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Connect With Me</h3>
            <div className="space-y-3">
              <a href="https://github.com/khoitran590" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Github size={20} className="mr-3" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/peterkhoitran/?profileId=ACoAACGBcowB9vVKOLWHOZfsW5ygkiZQdDbbSEs" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Linkedin size={20} className="mr-3" /> LinkedIn
              </a>
              <a href="mailto:khoitran590@gmail.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Mail size={20} className="mr-3" /> khoitran590@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;