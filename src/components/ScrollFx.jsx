// src/components/ScrollFx.jsx – scroll-driven character animation for headings
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

const Character = ({ char, index, centerIndex, scrollYProgress }) => {
  const isSpace = char === ' ';
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <motion.span
      className={cn('inline-block', isSpace && 'w-4')}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
};

// Heading whose characters fly in from the sides as it scrolls into view.
export const AnimatedHeading = ({ text, className }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'start center'],
  });

  const characters = text.split('');
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <h2
      ref={targetRef}
      className={cn(
        'text-4xl font-extrabold tracking-tight text-white',
        className
      )}
      style={{ perspective: '500px' }}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          centerIndex={centerIndex}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </h2>
  );
};

export default AnimatedHeading;
