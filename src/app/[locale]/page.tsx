import { locales as availableLocales } from '@/lib/i18n/config';
import HeroContact from '@/components/sections/HeroContact';
import VideoSection from '@/components/sections/VideoSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhaleMessage from '@/components/sections/WhaleMessage';
import PartnersSection from '@/components/sections/PartnersSection';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <main>
      <HeroContact />
      <VideoSection />
      <AboutSection />
      <WhaleMessage />
      <ServicesSection />
      <ServicesGrid />
      <PartnersSection />
    </main>
  );
} 