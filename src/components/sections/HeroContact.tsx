'use client';
import React from 'react';
import Container from '@/components/layout/Container';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const HeroContact: React.FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('home.hero');

  return (
    <section className="py-16 bg-black text-white">
      <Container>
        <div className="flex flex-col md:flex-row md:rtl:flex-row-reverse">
          {/* Headline container (70%) */}
          <div className="w-full md:w-[70%] mb-10 md:mb-0">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-sans font-bold leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              <div>{t('headline.line1')}</div>
              <div className="mt-2">{t('headline.line2')}</div>
              <div className="mt-2">{t('headline.line3')}</div>
            </h1>
          </div>
          
          {/* Contact info container (30%) */}
          <div className={`w-full md:w-[30%] ${isRTL ? 'font-arabic' : 'font-mono'} text-sm space-y-3`}>
            <div className="text-gray-400">{t('contact.office')}</div>
            
            <div>
              <div className="text-gray-400">{t('contact.mobile')}</div>
              <div dir="ltr" className={isRTL ? 'text-right' : ''}>{t('contact.mobileNumber')}</div>
            </div>
            
            <div>
              <div className="text-gray-400">{t('contact.email')}</div>
              <div dir="ltr" className={isRTL ? 'text-right' : ''}>{t('contact.emailAddress')}</div>
            </div>
            
            <div>
              <div className="text-gray-400">{t('contact.address')}</div>
              <div>{t('contact.addressIraq')}</div>
              <div className="mt-1">{t('contact.addressUs1')}</div>
              <div>{t('contact.addressUs2')}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroContact; 