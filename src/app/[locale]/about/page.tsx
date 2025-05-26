'use client';
import React, { useRef } from 'react';
import Container from '@/components/layout/Container';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BlurText from '@/components/ui/BlurText';
import BlurRevealText from '@/components/ui/BlurRevealText';
import ScrollYAnimation from '@/components/ui/ScrollYAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';


export default function About() {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('about');

  // Mask Reveal Image Component
  const MaskRevealImage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
    });

    // Ease-in-out-quint function
    const easeInOutQuint = (t: number): number => {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    };

    // Mask reveal from bottom to top
    const clipPath = useTransform(
      scrollYProgress,
      [0.0, 0.5], // Start earlier and finish sooner
      [
        "inset(100% 0% 0% 0%)", // Hidden - clipped from bottom
        "inset(0% 0% 0% 0%)"    // Revealed - fully visible
      ],
      { ease: easeInOutQuint }
    );

    // Parallax effect for the image (moves down as we scroll down)
    const imageY = useTransform(
      scrollYProgress,
      [0, 1],
      ["-10%", "30%"] // Image moves from -10% to +10%
    );

    return (
      <div ref={containerRef} className="w-full h-[80vh] overflow-hidden">
        <motion.img 
          src="/studio-01.jpg" 
          alt="MoonWhale Studio" 
          style={{ 
            clipPath,
            y: imageY
          }}
          className="w-full h-[120%] object-cover" // Extra height for parallax movement
        />
      </div>
    );
  };

  const handleAnimationComplete = () => {
    console.log('Headline animation completed!');
  };

  // Ease-in-out quint easing function
  const easeInOutQuint = (t: number): number => {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  };

  return (
    <main>
      <section className="py-16 bg-black text-white">
        <Container>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <BlurText
              text={t('headline.word1')}
              delay={180}
              animateBy="words"
              direction="bottom"
              startDelay={0}
              easing={easeInOutQuint}
              onAnimationComplete={handleAnimationComplete}
              className={`${isRTL ? 'font-arabic' : 'font-sans'} text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-medium leading-none tracking-tight block`}
              style={{ fontSize: 'clamp(4rem, 12vw, 16rem)' }}
              enableScrollAnimation={true}
              scrollStart={0}
              scrollEnd={250}
              scrollYRange={[0, -200]}
              scrollBlurRange={[0, 8]}
            />
            <BlurText
              text={t('headline.word2')}
              delay={580}
              animateBy="words"
              direction="bottom"
              startDelay={500}
              easing={easeInOutQuint}
              className={`${isRTL ? 'font-arabic' : 'font-sans'} text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-medium leading-none tracking-tight block`}
              style={{ fontSize: 'clamp(4rem, 12vw, 16rem)' }}
              enableScrollAnimation={true}
              scrollStart={30}
              scrollEnd={300}
              scrollYRange={[0, -220]}
              scrollBlurRange={[0, 10]}
            />
            <BlurText
              text={t('headline.word3')}
              delay={180}
              animateBy="words"
              direction="bottom"
              startDelay={1000}
              easing={easeInOutQuint}
              className={`${isRTL ? 'font-arabic' : 'font-sans'} text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-medium leading-none tracking-tight block`}
              style={{ fontSize: 'clamp(4rem, 12vw, 16rem)' }}
              enableScrollAnimation={true}
              scrollStart={60}
              scrollEnd={310}
              scrollYRange={[0, -240]}
              scrollBlurRange={[0, 12]}
            />
            
            {/* Subheading and Body Text Layout */}
            <div className="mt-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column - Main Subheading (wider) */}
                <ScrollYAnimation 
                  startY={300} 
                  scrollStart={0} 
                  scrollEnd={900}
                  className="lg:col-span-6"
                >
                  <BlurRevealText
                    text={t('subline')}
                    className={`${isRTL ? 'font-arabic text-right' : 'font-sans text-left'} text-xl md:text-2xl lg:text-6xl font-normal leading-relaxed text-gray-300`}
                    isRTL={isRTL}
                  />
                </ScrollYAnimation>
                
                {/* Middle Column - First Paragraph */}
                <ScrollYAnimation 
                  startY={450} 
                  scrollStart={0} 
                  scrollEnd={1000}
                  className="lg:col-span-3"
                >
                  <p className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-lg md:text-xl font-normal leading-relaxed text-gray-400`}>
                    {t('body.paragraph1')}
                  </p>
                </ScrollYAnimation>
                
                {/* Right Column - Second Paragraph */}
                <ScrollYAnimation 
                  startY={500} 
                  scrollStart={0} 
                  scrollEnd={1000}
                  className="lg:col-span-3"
                >
                  <p className={`${isRTL ? 'font-arabic text-right' : 'font-mono text-left'} text-lg md:text-xl font-normal leading-relaxed text-gray-400`}>
                    {t('body.paragraph2')}
                  </p>
                </ScrollYAnimation>
                            </div>
            </div>
 
            </div>

            {/* Full Width Studio Image Section */}
            <div className="mt-32">
              <MaskRevealImage />
            </div>

            {/* Large blank container for scroll testing */}
            <div className="mt-32">
              <div className="h-screen bg-gray-900/20 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-lg">Scroll testing area</p>
              </div>
              <div className="h-screen bg-gray-800/20 rounded-lg mt-8 flex items-center justify-center">
                <p className="text-gray-500 text-lg">More scroll space</p>
              </div>
              <div className="h-96 bg-gray-700/20 rounded-lg mt-8 flex items-center justify-center">
                <p className="text-gray-500 text-lg">End of scroll area</p>
              </div>
            </div>
        
        </Container>
      </section>
    </main>
  );
} 