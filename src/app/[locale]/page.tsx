import { locales as availableLocales } from '@/lib/i18n/config';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import HeroContact from '@/components/sections/HeroContact';
import VideoSection from '@/components/sections/VideoSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhaleMessage from '@/components/sections/WhaleMessage';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: Locale };
}

export default async function Home({ params }: PageProps) {
  const locale = params.locale;
  // enable static render
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return (
    <main>
      <HeroContact />
      <VideoSection />
      <AboutSection />
      <WhaleMessage />
      <ServicesSection />
      <ServicesGrid />
      {/* Additional sections will go here */}
    </main>
  );
} 