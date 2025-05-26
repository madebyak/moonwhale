'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    lenis?: any;
  }
}

export function useLenis() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Get the global Lenis instance
    if (typeof window !== 'undefined') {
      lenisRef.current = window.lenis;
    }
  }, []);

  const scrollTo = (target: string | number, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    stop,
    start,
  };
} 