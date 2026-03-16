// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useIntersectionRatio } from './useScrollReveal';

const FactOfTheDay = () => {
  const apiKey = process.env.REACT_APP_FACT_OF_DAY_API_KEY;
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      return;
    }
    const fetchFact = async () => {
      try {
        const res = await fetch('https://api.api-ninjas.com/v1/factoftheday', {
          headers: { 'X-Api-Key': apiKey },
        });
        if (res.ok) {
          const data = await res.json();
          setFact(data.fact || (Array.isArray(data) && data[0]?.fact) || '');
        }
      } catch {
        setFact('');
      } finally {
        setLoading(false);
      }
    };
    fetchFact();
  }, [apiKey]);

  if (!fact && !loading) return null;

  return (
    <div className="w-full py-3 px-4 text-center glass-liquid glass-edge-light bg-white/20 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
        {loading ? (
          <span className="animate-pulse">Loading fact of the day…</span>
        ) : (
          <>Did you know? {fact}</>
        )}
      </p>
    </div>
  );
};

const Home = () => {
  const aboutFill = useIntersectionRatio('15% 0px 15% 0px');

  const aboutOpacity = Math.min(1, aboutFill.ratio * 1.2);
  const aboutY = 24 * (1 - aboutFill.ratio);
  const aboutScale = 0.97 + 0.03 * aboutFill.ratio;

  return (
    <div className="min-h-screen bg-[#e3f2fd] dark:bg-[#0d1b2a]">
      {/* Fact of the Day - top of page */}
      <FactOfTheDay />
      {/* Hero Section - Liquid Glass */}
      <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden scroll-mt-20">
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl dark:from-blue-500/10 dark:via-indigo-500/5" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-amber-100/30 via-rose-100/20 to-transparent blur-3xl dark:from-amber-500/5 dark:via-rose-500/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
          <div className="text-center">
            <div className="mb-10 relative inline-block">
              {/* Glass ring around profile */}
              <div className="absolute -inset-4 rounded-[2rem] glass-liquid glass-edge-light bg-white/25 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10" />
              <img
                src="/assets/52660347.jpg"
                alt="Profile"
                className="relative mx-auto rounded-[1.5rem] object-cover select-none ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
                width={280}
                height={280}
                fetchPriority="high"
                loading="eager"
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
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="rounded-full px-6 py-3 inline-flex items-center justify-center text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-all duration-300 shadow-lg shadow-black/10 dark:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="rounded-full px-6 py-3 inline-flex items-center justify-center glass-liquid glass-edge-light bg-white/40 dark:bg-white/10 text-gray-900 dark:text-gray-100 border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - fills in slowly as user scrolls */}
      <section id="about" ref={aboutFill.ref} className="relative py-24 overflow-hidden min-h-[60vh] flex items-center scroll-mt-20">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-sky-200/40 via-indigo-100/30 to-transparent blur-3xl dark:from-sky-500/15 dark:via-indigo-500/10" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-tl from-rose-200/30 via-fuchsia-100/20 to-transparent blur-3xl dark:from-rose-500/10 dark:via-fuchsia-500/5" />
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-end w-full transition-[opacity,transform] duration-500 ease-out"
          style={{
            opacity: aboutOpacity,
            transform: `translateY(${aboutY}px) scale(${aboutScale})`,
          }}
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white text-center mb-6">About Me</h2>
            <div className="glass-liquid glass-edge-light rounded-[1.75rem] p-6 md:p-8 bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Background</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I am an aspiring software engineer with a passion for technology and innovation. I have a strong foundation in computer science principles and a keen interest in web development, mobile applications, and software engineering practices.
                I'm passionate about creating innovative solutions and enjoy the challenge of bringing ideas to life through code.
              </p>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
