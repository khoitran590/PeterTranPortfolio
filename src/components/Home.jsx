// src/components/Home.jsx
import React from 'react';
import { useInView } from './useInView';
import { Download } from 'lucide-react';
import ContactForm from './ContactForm';
import { useScrollReveal } from './useScrollReveal';

const Home = ({ setActiveTab }) => {
  const { ref, inView } = useInView({ root: null, rootMargin: '100px', threshold: 0 });
  const heroReveal = useScrollReveal({ root: null, rootMargin: '0px', threshold: 0.12 });
  const aboutReveal = useScrollReveal({ root: null, rootMargin: '0px', threshold: 0.12 });
  const contactReveal = useScrollReveal({ root: null, rootMargin: '0px', threshold: 0.12 });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section ref={heroReveal.ref} className={`flex items-center justify-center min-h-screen reveal-container ${heroReveal.visible ? 'reveal-visible' : 'reveal-hidden'} reveal-transition`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
      <div ref={ref} className="mb-10">
              <img
        src={inView ? "/assets/52660347.jpg" : undefined}
                alt="Profile"
                className="mx-auto rounded-3xl object-cover select-none shadow-sm"
                style={{ width: 640, height: 640 }}
        loading="lazy"
        decoding="async"
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
              <a
                href="#home-contact"
                className="rounded-full px-6 py-3 inline-flex items-center justify-center text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-colors"
              >
                Get in Touch
              </a>
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

      {/* About Section - Liquid Glass */}
  <section ref={aboutReveal.ref} className={`relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 overflow-hidden reveal-container ${aboutReveal.visible ? 'reveal-visible' : 'reveal-hidden'} reveal-transition`}>
        <div className="hidden md:block pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/30 to-indigo-300/20 blur-2xl" />
        <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/20 to-rose-300/20 blur-2xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center text-gray-900 dark:text-white mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/70 dark:bg-gray-800/50 shadow-sm">
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
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-black/10 dark:border-white/20 text-gray-900 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
            <div className="relative rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/70 dark:bg-gray-800/50 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Education</h3>
              <div className="space-y-4">
                <div className="rounded-2xl p-4 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-gray-800/50 supports-[backdrop-filter]:backdrop-blur">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cal State Fullerton</h4>
                  <p className="text-gray-600 dark:text-gray-300">BS in Computer Science, 2025</p>
                </div>
                <div className="rounded-2xl p-4 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-gray-800/50 supports-[backdrop-filter]:backdrop-blur">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cypress College</h4>
                  <p className="text-gray-600 dark:text-gray-300">Associate Degree, 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact (compact) Section */}
  <section id="home-contact" ref={contactReveal.ref} className={`py-24 bg-white dark:bg-gray-900 reveal-container ${contactReveal.visible ? 'reveal-visible' : 'reveal-hidden'} reveal-transition`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Let’s work together</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-prose">Have a project or role in mind? Drop a line and I’ll get back within 1–2 days.</p>
            </div>
            <div className="relative rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/70 dark:bg-gray-800/50 shadow-sm">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;