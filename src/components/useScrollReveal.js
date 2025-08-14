// Intersection Observer hook that toggles visibility on enter/leave for scroll fade effects
import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (options = { root: null, rootMargin: '0px', threshold: 0.12 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Toggle visibility based on intersection
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
};
