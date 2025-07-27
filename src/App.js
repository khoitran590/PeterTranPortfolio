// src/App.js
import React, { useState } from 'react';
import Layout from './components/Layout';
import TransitionWrapper from './components/TransitionWrapper';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Gallery from './components/Gallery';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    
    // Determine slide direction based on tab order
    const tabOrder = ['home', 'projects', 'skills', 'gallery', 'contact'];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);
    setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={handleTabChange} />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={handleTabChange} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
      <TransitionWrapper isTransitioning={isTransitioning} slideDirection={slideDirection}>
        {renderActiveComponent()}
      </TransitionWrapper>
    </Layout>
  );
}

export default App;