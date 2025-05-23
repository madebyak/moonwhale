'use client';
import React from 'react';
import Container from '@/components/layout/Container';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ServicesSection: React.FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('home.services');

  return (
    <section className="py-16 bg-black text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Label on the left */}
          <div className="lg:col-span-3">
            <div className={`${isRTL ? 'font-arabic' : 'font-mono'} text-sm text-black bg-white px-4 py-2 font-medium uppercase inline-block`}>
              {t('label')}
            </div>
          </div>
          
          {/* Headlines on the right */}
          <div className="lg:col-span-9">
            <div className={`${isRTL ? 'font-arabic' : 'font-sans'} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-loose space-y-6`}>
              <div>{t('headline.part1')}</div>
              <div>{t('headline.part2')}</div>
              <div>{t('headline.part3')}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection; 