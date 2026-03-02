// src/components/SinglePage.jsx – unified single-page layout with progressive loading
import React, { Suspense } from 'react';
import LazySection from './LazySection';
import ContactSection from './ContactSection';

const Home = React.lazy(() => import('./Home'));
const Projects = React.lazy(() => import('./Projects'));
const Skills = React.lazy(() => import('./Skills'));
const Weather = React.lazy(() => import('./Weather'));
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
      <Suspense fallback={<SectionFallback />}>
        <Home />
      </Suspense>
      <div id="projects" className="scroll-mt-20">
        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </LazySection>
      </div>
      <div id="skills" className="scroll-mt-20">
        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </LazySection>
      </div>
      <div id="weather" className="scroll-mt-20">
        <LazySection fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Weather />
          </Suspense>
        </LazySection>
      </div>
      <div id="gallery" className="scroll-mt-20">
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
