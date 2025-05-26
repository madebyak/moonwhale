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
  const tClients = useTranslations('home.clients');
  
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

  // Scrolling logos data - for the horizontal marquee
  const scrollingLogos = [
    { name: 'Next.js', logo: '/next.svg', altText: 'Next.js Logo' },
    { name: 'MoonWhale Web', logo: '/MW_logo_web.svg', altText: 'MoonWhale Web Logo' },
    { name: 'MoonWhale Symbol', logo: '/mw-symbol.svg', altText: 'MoonWhale Symbol' },
    { name: 'Next.js', logo: '/next.svg', altText: 'Next.js Logo' },
    { name: 'MoonWhale Web', logo: '/MW_logo_web.svg', altText: 'MoonWhale Web Logo' },
    { name: 'MoonWhale Symbol', logo: '/mw-symbol.svg', altText: 'MoonWhale Symbol' },
    { name: 'Next.js', logo: '/next.svg', altText: 'Next.js Logo' },
    { name: 'MoonWhale Web', logo: '/MW_logo_web.svg', altText: 'MoonWhale Web Logo' },
    { name: 'MoonWhale Symbol', logo: '/mw-symbol.svg', altText: 'MoonWhale Symbol' },
    { name: 'Next.js', logo: '/next.svg', altText: 'Next.js Logo' },
    { name: 'MoonWhale Web', logo: '/MW_logo_web.svg', altText: 'MoonWhale Web Logo' },
    { name: 'MoonWhale Symbol', logo: '/mw-symbol.svg', altText: 'MoonWhale Symbol' }
  ];

  // easeInOutCirc timing for consistent animations
  const easeInOutCirc = [0.785, 0.135, 0.15, 0.86];
  // easeInOutQuint for hover effect
  const easeInOutQuint = [0.83, 0, 0.17, 1];

  return (
    <section className="py-16 bg-black text-white" ref={sectionRef}>
      <Container>
        <div>
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
          
          {/* Headline and Subline Row */}
          <div className="space-y-6 mt-4">
            {/* Main Headline */}
            <motion.div 
              className={`${isRTL ? 'font-arabic' : 'font-sans'} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight`}
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
              className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-lg md:text-xl leading-relaxed max-w-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: easeInOutCirc
              }}
            >
              {t('subline')}
            </motion.div>
          </div>

          {/* Partners Horizontal Scrolling Logos */}
          <motion.div 
            className="relative overflow-hidden mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: easeInOutCirc
            }}
          >
            {/* Scrolling Container */}
            <motion.div
              className="flex items-center gap-16 whitespace-nowrap"
              animate={{
                x: [0, -100 * scrollingLogos.length / 2], // Move by half the logos width
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20, // 20 seconds for full cycle
                  ease: "linear",
                },
              }}
            >
              {/* Render logos multiple times for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  {scrollingLogos.map((logo, index) => (
                    <motion.div
                      key={`${setIndex}-${index}`}
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        duration: 0.3,
                        ease: easeInOutQuint
                      }}
                    >
                      <div className="w-24 h-16 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={logo.logo}
                            alt={logo.altText}
                            fill
                            className="object-contain filter brightness-0 invert"
                            sizes="96px"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* Divider Line Between Sections */}
          <motion.div 
            className="mt-24 mb-24"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{
              duration: 1.0,
              delay: 1.6,
              ease: easeInOutCirc
            }}
          >
            <div className="w-full h-px bg-white origin-center"></div>
          </motion.div>

          {/* Second Subsection: Static Grid Logos */}
          <div className="mt-16">
            {/* Section Label */}
            <motion.div 
              className={`${isRTL ? 'font-arabic' : 'font-mono'} text-sm text-black bg-white px-4 py-2 font-medium uppercase inline-block`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 1.8,
                ease: easeInOutCirc
              }}
            >
              {tClients('label')}
            </motion.div>
            
            {/* Headline and Subline */}
            <div className="space-y-6 mt-4"
            >
              {/* Main Headline */}
              <motion.div 
                className={`${isRTL ? 'font-arabic' : 'font-sans'} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.8,
                  delay: 2.0,
                  ease: easeInOutCirc
                }}
              >
                {tClients('headline')}
              </motion.div>

              {/* Subline */}
              <motion.div 
                className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-lg md:text-xl leading-relaxed max-w-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: 2.2,
                  ease: easeInOutCirc
                }}
              >
                {tClients('subline')}
              </motion.div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mt-16">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.6,
                    delay: 2.4 + (index * 0.1),
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

                  {/* Logo Container - Removed border, smaller size, added hover scale */}
                  <div className="w-full h-16 flex items-center justify-center bg-transparent p-4">
                    <motion.div 
                      className="relative w-full h-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        duration: 0.3,
                        ease: easeInOutQuint
                      }}
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.altText}
                        fill
                        className="object-contain filter brightness-0 invert"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection; 