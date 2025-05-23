'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ScrollVelocity from '@/components/ui/ScrollVelocity';

const WhaleMessage: React.FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('home.whaleMessage');

  const texts = [
    t('line1'),
    t('line2')
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-[110%] object-cover"
          style={{
            transform: 'translateY(-5%)'
          }}
        >
          <source src="/whale-video-loop.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Scroll Velocity Text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <ScrollVelocity
          texts={texts}
          velocity={150}
          isRTL={isRTL}
          className="px-4"
        />
      </div>
    </section>
  );
};

export default WhaleMessage;