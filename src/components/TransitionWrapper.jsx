// src/components/TransitionWrapper.jsx
import React from 'react';

const TransitionWrapper = ({ children, isTransitioning, slideDirection = 'right' }) => {
  const getTransformClass = () => {
    if (!isTransitioning) return 'opacity-100 transform translate-x-0 translate-y-0 scale-100';
    
    const slideClass = slideDirection === 'right' ? 'translate-x-8' : '-translate-x-8';
    return `opacity-0 transform ${slideClass} translate-y-1 scale-[0.99]`;
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ease-out ${getTransformClass()}`}>
      {!isTransitioning && children}
      {isTransitioning && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-100"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitionWrapper;
