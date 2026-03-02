import { useCallback, useRef } from 'react';

export function useThrottledCallback(callback, delay) {
  const lastRun = useRef(0);
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      const now = Date.now();
      const remaining = delay - (now - lastRun.current);

      const run = () => {
        lastRun.current = Date.now();
        callback(...args);
      };

      if (remaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        run();
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          run();
        }, remaining);
      }
    },
    [callback, delay]
  );
}
