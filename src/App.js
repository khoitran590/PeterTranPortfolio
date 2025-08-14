// src/App.js
import React, { Suspense, useEffect, useState } from 'react';
import Layout from './components/Layout';
import TransitionWrapper from './components/TransitionWrapper';

// Code-split each tab
const Home = React.lazy(() => import('./components/Home'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Weather = React.lazy(() => import('./components/Weather'));
const Contact = React.lazy(() => import('./components/Contact'));
const Gallery = React.lazy(() => import('./components/Gallery'));

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    const tabOrder = ['home', 'projects', 'skills', 'weather', 'gallery', 'contact'];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);
    setSlideDirection(newIndex > currentIndex ? 'right' : 'left');

    // Trigger a quick enter animation without blocking render
    setIsTransitioning(true);
    setActiveTab(newTab);
    // Let the browser paint once, then end the transition
    requestAnimationFrame(() => {
      setTimeout(() => setIsTransitioning(false), 0);
    });
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={handleTabChange} />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'weather':
        return <Weather />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={handleTabChange} />;
    }
  };

  // Idle-time preloading of other tabs to speed up first navigation
  useEffect(() => {
    const idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 300); };
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => {
      import('./components/Projects');
      import('./components/Skills');
      import('./components/Weather');
      import('./components/Gallery');
      import('./components/Contact');
    });
    return () => cancel(id);
  }, []);

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
      <TransitionWrapper isTransitioning={isTransitioning} slideDirection={slideDirection}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
              </div>
            </div>
          }
        >
          {renderActiveComponent()}
        </Suspense>
      </TransitionWrapper>
    </Layout>
  );
}

export default App;