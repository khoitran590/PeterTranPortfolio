// src/components/TransitionWrapper.jsx
import React from 'react';

const TransitionWrapper = ({ children, isTransitioning, slideDirection = 'right' }) => {
  const getTransformClass = () => {
    if (!isTransitioning) return 'opacity-100 transform translate-x-0 translate-y-0 scale-100';
    
    const slideClass = slideDirection === 'right' ? 'translate-x-8' : '-translate-x-8';
    return `opacity-0 transform ${slideClass} translate-y-1 scale-[0.99]`;
  };

  return (
    <div className={`min-h-screen transition-all duration-200 ease-out ${getTransformClass()}`}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
