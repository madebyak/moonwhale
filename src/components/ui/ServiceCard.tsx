'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface ServiceCardProps {
  icon: string;
  headline: string;
  subline: string;
  bulletPoints: string[];
  index: number;
  isRTL?: boolean;
  totalCards: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  headline,
  subline,
  bulletPoints,
  index,
  isRTL = false,
  totalCards
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation delays
  const cardDelay = index * 0.15;
  
  // easeInOutCirc timing
  const easeInOutCirc = [0.785, 0.135, 0.15, 0.86];

  // Determine which borders to show based on position
  const isFirstCard = index === 0;
  const isLastCard = index === totalCards - 1;

  return (
    <motion.div 
      ref={ref} 
      className="relative h-full bg-black"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: cardDelay,
        ease: easeInOutCirc
      }}
      style={{
        borderTop: '1px solid white',
        borderBottom: '1px solid white',
        borderLeft: isFirstCard ? '1px solid white' : 'none',
        borderRight: isLastCard ? '1px solid white' : '1px solid white',
      }}
    >
      {/* Card Content */}
      <div className="relative z-10 p-8 h-full">
        <div className={`flex flex-col h-full ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Icon at Top */}
          <div className={`mb-8 ${isRTL ? 'ml-auto' : ''}`}>
            <Image
              src={icon}
              alt={headline}
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>

          {/* Headline */}
          <h3 className={`${isRTL ? 'font-arabic' : 'font-sans'} text-4xl font-bold text-white mb-4 uppercase leading-tight`}>
            {headline}
          </h3>

          {/* Subline */}
          <p className={`${isRTL ? 'font-arabic' : 'font-mono'} text-lg text-gray-300 mb-6 leading-relaxed`}>
            {subline}
          </p>

          {/* Bullet Points */}
          <ul className={`${isRTL ? 'font-arabic' : 'font-mono'} text-medium text-gray-400 mb-8 space-y-2 flex-grow`}>
            {bulletPoints.map((point, pointIndex) => (
              <li key={pointIndex} className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`text-white ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`}>•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {/* Read More Button */}
          <div className={`mt-auto ${isRTL ? 'text-right' : 'text-left'}`}>
            <button className={`${isRTL ? 'font-arabic' : 'font-mono'} text-medium text-white hover:text-gray-300 transition-colors duration-300 group flex items-center ${isRTL ? 'flex-row-reverse' : ''} uppercase font-medium`}>
              <span>Read More</span>
              <svg
                className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform duration-300`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard; 