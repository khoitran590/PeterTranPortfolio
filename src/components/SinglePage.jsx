// src/components/SinglePage.jsx – recruiter-first single-page layout
import React, { Suspense } from 'react';
import LazySection from './LazySection';
import ContactSection from './ContactSection';
import Home from './Home';
import Projects from './Projects';
import About from './About';
import Skills from './Skills';

const Gallery = React.lazy(() => import('./Gallery'));

const SectionFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-100" />
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200" />
    </div>
  </div>
);

export default function SinglePage() {
  return (
    <div className="min-h-screen">
      <Home />
      <Projects />
      <About />
      <Skills />
      <div id="gallery" className="scroll-mt-24">
        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Gallery />
          </Suspense>
        </LazySection>
      </div>
      <ContactSection />
    </div>
  );
}
