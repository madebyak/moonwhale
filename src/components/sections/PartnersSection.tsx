'use client';
import React, { useRef } from 'react';
import Container from '@/components/layout/Container';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const PartnersSection: React.FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('home.partners');
  
  // Ref for scroll-triggered animation
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Partners data - using available logos for testing
  const partners = [
    { 
      id: '01', 
      name: 'Next.js', 
      logo: '/next.svg',
      altText: 'Next.js Logo'
    },
    { 
      id: '02', 
      name: 'MoonWhale Web', 
      logo: '/MW_logo_web.svg',
      altText: 'MoonWhale Web Logo'
    },
    { 
      id: '03', 
      name: 'MoonWhale Symbol', 
      logo: '/mw-symbol.svg',
      altText: 'MoonWhale Symbol'
    },
    { 
      id: '04', 
      name: 'Next.js', 
      logo: '/next.svg',
      altText: 'Next.js Logo'
    },
    { 
      id: '05', 
      name: 'MoonWhale Web', 
      logo: '/MW_logo_web.svg',
      altText: 'MoonWhale Web Logo'
    },
    { 
      id: '06', 
      name: 'MoonWhale Symbol', 
      logo: '/mw-symbol.svg',
      altText: 'MoonWhale Symbol'
    },
    { 
      id: '07', 
      name: 'Next.js', 
      logo: '/next.svg',
      altText: 'Next.js Logo'
    },
    { 
      id: '08', 
      name: 'MoonWhale Web', 
      logo: '/MW_logo_web.svg',
      altText: 'MoonWhale Web Logo'
    },
    { 
      id: '09', 
      name: 'MoonWhale Symbol', 
      logo: '/mw-symbol.svg',
      altText: 'MoonWhale Symbol'
    },
    { 
      id: '10', 
      name: 'Next.js', 
      logo: '/next.svg',
      altText: 'Next.js Logo'
    },
    { 
      id: '11', 
      name: 'MoonWhale Web', 
      logo: '/MW_logo_web.svg',
      altText: 'MoonWhale Web Logo'
    },
    { 
      id: '12', 
      name: 'MoonWhale Symbol', 
      logo: '/mw-symbol.svg',
      altText: 'MoonWhale Symbol'
    }
  ];

  // easeInOutCirc timing for consistent animations
  const easeInOutCirc = [0.785, 0.135, 0.15, 0.86];

  return (
    <section className="py-16 bg-black text-white" ref={sectionRef}>
      <Container>
        <div className="space-y-12">
          {/* Section Label */}
          <motion.div 
            className={`${isRTL ? 'font-arabic' : 'font-mono'} text-sm text-black bg-white px-4 py-2 font-medium uppercase inline-block`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              ease: easeInOutCirc
            }}
          >
            {t('label')}
          </motion.div>
          
          {/* Main Headline */}
          <motion.div 
            className={`${isRTL ? 'font-arabic' : 'font-sans'} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-loose`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: easeInOutCirc
            }}
          >
            {t('headline')}
          </motion.div>

          {/* Subline */}
          <motion.div 
            className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-lg md:text-xl leading-relaxed max-w-4xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: easeInOutCirc
            }}
          >
            {t('subline')}
          </motion.div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mt-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + (index * 0.1),
                  ease: easeInOutCirc
                }}
              >
                {/* Number and Divider */}
                <div className="w-full flex flex-col items-start space-y-2">
                  {/* Number */}
                  <div className={`${isRTL ? 'font-arabic' : 'font-mono'} text-xs text-gray-400 font-medium`}>
                    [{partner.id}]
                  </div>
                  {/* Divider Line */}
                  <div className="w-full h-px bg-white"></div>
                </div>

                {/* Logo Container */}
                <div className="w-full h-20 flex items-center justify-center bg-transparent border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors duration-300">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.altText}
                      fill
                      className="object-contain filter brightness-0 invert"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection; 