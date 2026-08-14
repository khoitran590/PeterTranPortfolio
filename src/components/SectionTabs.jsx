// src/components/SectionTabs.jsx – renders exactly one section at a time.
//
// Replaces the old single scrolling page. Only the active section is mounted,
// so the gallery's images and the contact form never cost anything until the
// visitor actually opens those tabs.
import React, { Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Home from './Home';
import Projects from './Projects';
import About from './About';
import Skills from './Skills';
import ContactSection from './ContactSection';

const Gallery = React.lazy(() => import('./Gallery'));

const PANELS = {
  home: Home,
  projects: Projects,
  about: About,
  skills: Skills,
  gallery: Gallery,
  contact: ContactSection,
};

const SectionFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading section">
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--accent)]" />
      <div className="animation-delay-100 h-2 w-2 animate-pulse rounded-full bg-[color:var(--accent)]" />
      <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-[color:var(--accent)]" />
    </div>
  </div>
);

export default function SectionTabs({ section }) {
  const reduceMotion = useReducedMotion();
  const Panel = PANELS[section] || Home;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={section}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<SectionFallback />}>
          <Panel />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
