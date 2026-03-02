// LazySection: renders children only when section is near viewport (saves initial bundle/parse)
import React, { useState, useRef, useEffect } from 'react';

export default function LazySection({ children, rootMargin = '400px', fallback = null }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {visible ? children : fallback}
    </div>
  );
}
