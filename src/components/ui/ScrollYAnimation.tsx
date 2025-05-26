'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollYAnimationProps {
  children: React.ReactNode;
  startY?: number; // Initial Y offset (how far down to start)
  scrollStart?: number; // When to start the animation (scroll distance)
  scrollEnd?: number; // When to end the animation (scroll distance)
  className?: string;
}

const ScrollYAnimation: React.FC<ScrollYAnimationProps> = ({
  children,
  startY = 80, // Default: start 80px down
  scrollStart = 0,
  scrollEnd = 300,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Transform scroll position to Y movement
  // Starts at startY (pushed down) and animates to 0 (normal position)
  const y = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    [startY, 0]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollYAnimation; 