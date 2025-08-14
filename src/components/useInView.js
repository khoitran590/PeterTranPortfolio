// Lightweight Intersection Observer helper for image lazy reveal
import { useEffect, useRef, useState } from 'react';

export const useInView = (options = { root: null, rootMargin: '0px', threshold: 0.1 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, inView]);

  return { ref, inView };
};
