'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollingProps {
  children: React.ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Lower value = smoother but slower response
      duration: 1.2, // Duration of scroll
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      touchMultiplier: 2, // Increase touch sensitivity
    });

    lenisRef.current = lenis;

    // Make Lenis globally accessible
    if (typeof window !== 'undefined') {
      (window as typeof window & { lenis: Lenis }).lenis = lenis;
    }

    // Integrate with GSAP ScrollTrigger (wrapped in try-catch)
    try {
      lenis.on('scroll', ScrollTrigger.update);
      
      // Add to GSAP ticker for smooth integration  
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      
      // Disable GSAP's lag smoothing to avoid conflicts
      gsap.ticker.lagSmoothing(0);
      
      console.log('GSAP-Lenis integration successful');
    } catch (error) {
      console.warn('GSAP-Lenis integration failed:', error);
      // Fallback: use requestAnimationFrame
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Integrate with Framer Motion scroll
  useEffect(() => {
    if (lenisRef.current && typeof window !== 'undefined') {
      // Update Framer Motion's scroll detection
      const handleScroll = () => {
        // This ensures Framer Motion's useScroll hook stays in sync
        window.dispatchEvent(new Event('scroll'));
      };

      lenisRef.current.on('scroll', handleScroll);

      return () => {
        if (lenisRef.current) {
          lenisRef.current.off('scroll', handleScroll);
        }
      };
    }
  }, []);

  return <>{children}</>;
} 