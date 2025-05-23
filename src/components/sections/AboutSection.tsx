'use client';
import React from 'react';
import Container from '@/components/layout/Container';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection: React.FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('home.about');
  
  // Ref for scroll-triggered animation
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <section className="py-16 bg-black text-white">
      <Container>
        <div className="space-y-12">
          {/* Section Label */}
          <div className={`${isRTL ? 'font-arabic' : 'font-mono'} text-sm text-black bg-white px-4 py-2  font-medium uppercase inline-block`}>
            {t('label')}
          </div>
          
          {/* Main Headline */}
          <div className={`${isRTL ? 'font-arabic' : 'font-sans'} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-loose`}>
            <span>{t('headline.part1')} </span>
            <span className="inline-flex items-center mx-2">
              <Image 
                src="/whale-small.png" 
                alt="Whale" 
                width={160} 
                height={160} 
                className="inline-block align-middle"
              />
            </span>
            <span> {t('headline.part2')} </span>
            <span className="inline-flex items-center mx-2">
              <Image 
                src="/moon-small.png" 
                alt="Moon" 
                width={80} 
                height={80} 
                className="inline-block align-middle"
              />
            </span>
            <span> {t('headline.part3')}</span>
          </div>

          {/* Content Section - Right aligned in LTR, Left aligned in RTL */}
          <div className={`max-w-4xl ${isRTL ? 'mr-auto' : 'ml-auto'} space-y-8`}>
            {/* Subline */}
            <div className={`${isRTL ? 'font-arabic text-right' : 'font-sans text-left'} text-xl md:text-4xl font-medium leading-relaxed`}>
              {t('subline')}
            </div>

            {/* Mission and Vision Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="space-y-4">
                <div className={`${isRTL ? 'font-arabic' : 'font-mono'} text-sm text-black bg-white px-4 py-2 font-medium uppercase inline-block`}>
                  {t('mission.label')}
                </div>
                <div className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-sm leading-relaxed`}>
                  {t('mission.text')}
                </div>
              </div>

              {/* Vision */}
              <div className="space-y-4">
                <div className={`${isRTL ? 'font-arabic' : 'font-mono'} text-sm text-black bg-white px-4 py-2 font-medium uppercase inline-block`}>
                  {t('vision.label')}
                </div>
                <div className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-sm leading-relaxed`}>
                  {t('vision.text')}
                </div>
              </div>
            </div>
          </div>

          {/* Office Image with Mask Animation */}
          <div ref={imageRef} className="w-full h-[600px] relative overflow-hidden rounded-lg">
            <motion.div
              className="w-full h-full relative"
              initial={{ clipPath: "inset(0 50% 0 50%)" }}
              animate={isInView ? { clipPath: "inset(0 0% 0 0%)" } : { clipPath: "inset(0 50% 0 50%)" }}
              transition={{
                duration: 1.2,
                ease: [0.83, 0, 0.17, 1] // easeInOutQuint
              }}
            >
              <Image 
                src="/about-office-img.jpg" 
                alt="MoonWhale Office" 
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection; 