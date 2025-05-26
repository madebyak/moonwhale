'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Get the global Lenis instance
    if (typeof window !== 'undefined') {
      lenisRef.current = window.lenis || null;
    }
  }, []);

  const scrollTo = (target: string | number, options?: { duration?: number; offset?: number; immediate?: boolean }) => {
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