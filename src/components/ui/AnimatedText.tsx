'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  isRTL?: boolean;
  staggerDelay?: number;
  exaggeratedIndices?: number[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  isRTL = false,
  staggerDelay = 0.08,
  exaggeratedIndices = []
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Split text into words
  const words = text.split(' ');

  // easeInOutCirc timing function
  const easeInOutCirc = [0.785, 0.135, 0.15, 0.86];

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      {words.map((word, index) => {
        // Check if this word should have exaggerated values
        const isExaggerated = exaggeratedIndices.includes(index);
        
        // Calculate delay - reverse for RTL
        const delayIndex = isRTL ? words.length - 1 - index : index;
        const baseDelay = delayIndex * staggerDelay;
        
        // Add extra delay for exaggerated words
        const delay = isExaggerated ? baseDelay + 0.1 : baseDelay;
        
        // Different Y offset for exaggerated words
        const yOffset = isExaggerated ? 120 : 80;
        
        // Different blur intensity for exaggerated words
        const blurIntensity = isExaggerated ? 12 : 8;

        return (
          <motion.span
            key={index}
            className="inline-block"
            style={{ 
              marginRight: isRTL ? '0' : '0.25em',
              marginLeft: isRTL ? '0.25em' : '0'
            }}
            initial={{
              y: yOffset,
              filter: `blur(${blurIntensity}px)`,
              opacity: 0.3
            }}
            animate={isInView ? {
              y: 0,
              filter: 'blur(0px)',
              opacity: 1
            } : {}}
            transition={{
              duration: isExaggerated ? 1.0 : 0.8,
              delay: delay,
              ease: easeInOutCirc
            }}
          >
            {word}
            {/* Add space after word except for the last one */}
            {index < words.length - 1 && (
              <span className="inline-block" style={{ width: '0.25em' }}>&nbsp;</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

export default AnimatedText; 