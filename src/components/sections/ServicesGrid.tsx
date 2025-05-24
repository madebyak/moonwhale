'use client';
import React from 'react';
import Container from '@/components/layout/Container';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ServiceCard from '@/components/ui/ServiceCard';

const ServicesGrid: React.FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  const t = useTranslations('home.servicesGrid');

  // Services data
  const services = [
    {
      id: '01',
      icon: '/icons/ai-svg.svg',
      headline: t('services.ai.headline'),
      subline: t('services.ai.subline'),
      bulletPoints: [
        t('services.ai.points.strategy'),
        t('services.ai.points.governance'),
        t('services.ai.points.models'),
        t('services.ai.points.automation'),
        t('services.ai.points.finetuning')
      ]
    },
    {
      id: '02',
      icon: '/icons/coding-svg.svg',
      headline: t('services.development.headline'),
      subline: t('services.development.subline'),
      bulletPoints: [
        t('services.development.points.websites'),
        t('services.development.points.saas'),
        t('services.development.points.mobile'),
        t('services.development.points.integrations'),
        t('services.development.points.devops'),
        t('services.development.points.performance')
      ]
    },
    {
      id: '03',
      icon: '/icons/uxui-svg.svg',
      headline: t('services.uxui.headline'),
      subline: t('services.uxui.subline'),
      bulletPoints: [
        t('services.uxui.points.research'),
        t('services.uxui.points.wireframes'),
        t('services.uxui.points.systems'),
        t('services.uxui.points.motion'),
        t('services.uxui.points.handoff')
      ]
    },
    {
      id: '04',
      icon: '/icons/design-svg.svg',
      headline: t('services.branding.headline'),
      subline: t('services.branding.subline'),
      bulletPoints: [
        t('services.branding.points.discovery'),
        t('services.branding.points.naming'),
        t('services.branding.points.identity'),
        t('services.branding.points.guides'),
        t('services.branding.points.launch')
      ]
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <Container>
        {/* Services Grid - Zero gaps for seamless borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-0">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="min-h-[600px] border-0"
              style={{ margin: 0, padding: 0 }}
            >
              <ServiceCard
                icon={service.icon}
                headline={service.headline}
                subline={service.subline}
                bulletPoints={service.bulletPoints}
                index={index}
                isRTL={isRTL}
                totalCards={services.length}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesGrid; 