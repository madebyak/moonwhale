import { locales as availableLocales } from '@/lib/i18n/config';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';

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
    <main className="p-10 text-center">
    </main>
  );
} 