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
    <div className="min-h-screen bg-[#e3f2fd] dark:bg-[#0d1b2a]">
      {/* Hero Section - Liquid Glass */}
      <section ref={heroReveal.ref} className={`relative flex items-center justify-center min-h-screen overflow-hidden reveal-container ${heroReveal.visible ? 'reveal-visible' : 'reveal-hidden'} reveal-transition`}>
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl dark:from-blue-500/10 dark:via-indigo-500/5" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-amber-100/30 via-rose-100/20 to-transparent blur-3xl dark:from-amber-500/5 dark:via-rose-500/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div ref={ref} className="mb-10 relative inline-block">
              {/* Glass ring around profile */}
              <div className="absolute -inset-4 rounded-[2rem] glass-liquid glass-edge-light bg-white/25 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10" />
              <img
                src={inView ? "/assets/52660347.jpg" : undefined}
                alt="Profile"
                className="relative mx-auto rounded-[1.5rem] object-cover select-none ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
                style={{ width: 280, height: 280 }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
              Peter Tran
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-6">
              Software Engineer Graduate at Cal State Fullerton
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
              A very normal person who enjoys designing stuff and making things work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#home-contact"
                className="rounded-full px-6 py-3 inline-flex items-center justify-center text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-all duration-300 shadow-lg shadow-black/10 dark:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in Touch
              </a>
              <button
                onClick={() => setActiveTab && setActiveTab('projects')}
                className="rounded-full px-6 py-3 inline-flex items-center justify-center glass-liquid glass-edge-light bg-white/40 dark:bg-white/10 text-gray-900 dark:text-gray-100 border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Liquid Glass */}
      <section ref={aboutReveal.ref} className={`relative py-24 overflow-hidden reveal-container ${aboutReveal.visible ? 'reveal-visible' : 'reveal-hidden'} reveal-transition`}>
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-sky-200/40 via-indigo-100/30 to-transparent blur-3xl dark:from-sky-500/15 dark:via-indigo-500/10" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-tl from-rose-200/30 via-fuchsia-100/20 to-transparent blur-3xl dark:from-rose-500/10 dark:via-fuchsia-500/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center text-gray-900 dark:text-white mb-14">About Me</h2>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="glass-liquid glass-edge-light rounded-[1.75rem] p-6 md:p-8 bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
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
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-full glass-liquid-soft bg-white/50 dark:bg-white/10 text-gray-900 dark:text-gray-100 border border-black/5 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-all duration-300"
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
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-all duration-300 shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download size={20} className="mr-2" />
                  Download Resume
                </a>
              </div>
            </div>
            <div className="glass-liquid glass-edge-light rounded-[1.75rem] p-6 md:p-8 bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Education</h3>
              <div className="space-y-3">
                <div className="glass-liquid-soft rounded-2xl p-4 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cal State Fullerton</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">BS in Computer Science, 2025</p>
                </div>
                <div className="glass-liquid-soft rounded-2xl p-4 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cypress College</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Associate Degree, 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact (compact) Section */}
  <section id="home-contact" ref={contactReveal.ref} className={`relative py-24 overflow-hidden reveal-container ${contactReveal.visible ? 'reveal-visible' : 'reveal-hidden'} reveal-transition`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-200/30 to-transparent blur-3xl dark:from-indigo-500/10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Let’s work together</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-prose">Have a project or role in mind? Drop a line and I’ll get back within 1–2 days.</p>
            </div>
            <div className="glass-liquid glass-edge-light rounded-[1.75rem] p-6 md:p-8 bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;