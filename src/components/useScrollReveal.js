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

const RATIO_THRESHOLDS = [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

/** Returns intersection ratio 0–1 so content can "fill in" gradually as user scrolls */
export const useIntersectionRatio = (rootMargin = '15% 0px 15% 0px') => {
  const ref = useRef(null);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setRatio(entry.intersectionRatio));
      },
      { root: null, rootMargin, threshold: RATIO_THRESHOLDS }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, ratio };
};
