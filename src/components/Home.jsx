// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import StockQuotePanel from './StockQuotePanel';
import { WeatherCard } from './Weather';
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
    <div className="w-full pb-3 pt-3 sm:pt-28 px-4 text-center glass-liquid glass-edge-light bg-white/20 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
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
    <div className="min-h-screen">
      {/* Fact of the Day - top of page */}
      <FactOfTheDay />
      {/* Hero Section - dark monochrome */}
      <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden scroll-mt-24">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 w-full">
          <div className="flex flex-col items-center text-center">
            {/* Gradient sphere */}
            <div
              className="mb-10 h-36 w-36 rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #fafafa, #a3a3a3 45%, #404040 100%)',
              }}
            />

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4">
              Peter Tran
            </h1>
            <p className="text-base md:text-lg font-medium text-white/60 mb-6">
              Software Engineer Graduate at Cal State Fullerton
            </p>
            <p className="max-w-2xl text-base font-medium md:text-xl text-white/50 mb-10 leading-relaxed">
              I'm an aspiring software engineer with a passion for technology and
              innovation. With a strong foundation in computer science and a keen
              interest in web development, mobile applications, and clean
              engineering practices, I love bringing ideas to life through code.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="rounded-xl px-7 py-3.5 inline-flex items-center justify-center gap-2 font-semibold text-black bg-neutral-100 hover:bg-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail size={18} />
                Get in Touch
              </a>
              <a
                href="#projects"
                className="rounded-xl px-7 py-3.5 inline-flex items-center justify-center gap-2 font-semibold text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Projects
                <ArrowDown size={18} />
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-12 flex items-center gap-4">
              {[
                { href: 'https://github.com/khoitran590', label: 'GitHub', Icon: Github },
                { href: 'https://www.linkedin.com/in/peterkhoitran/', label: 'LinkedIn', Icon: Linkedin },
                { href: '/assets/Peter_Tran_Resume.pdf', label: 'Resume', Icon: FileText },
                { href: '#contact', label: 'Email', Icon: Mail },
              ].map(({ href, label, Icon }) => {
                const external = href.startsWith('http') || href.endsWith('.pdf');
                return (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="h-12 w-12 inline-flex items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <Icon size={20} />
                </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - fills in slowly as user scrolls */}
      <section id="about" ref={aboutFill.ref} className="relative py-20 overflow-hidden flex items-center scroll-mt-24">
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-[opacity,transform] duration-500 ease-out"
          style={{
            opacity: aboutOpacity,
            transform: `translateY(${aboutY}px) scale(${aboutScale})`,
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-center gap-10 w-full">
            <div className="flex flex-col items-center w-full max-w-xl">
              <p className="section-kicker">A quick look</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-8">Market Snapshot</h2>
              <div className="w-full">
                <StockQuotePanel />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="section-kicker">Right now</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-8">Weather</h2>
              <WeatherCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
