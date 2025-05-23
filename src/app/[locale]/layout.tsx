import type { ReactNode } from 'react';
import { isRtlLocale, Locale, locales as availableLocales } from '@/lib/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/ui/Navbar/Navbar';
import '../globals.css'; // Import globals.css here
import { aeonik, geistMono, notoArabic } from '../fonts'; // Import fonts here

// Function to load messages based on locale
async function getMessages(locale: string) {
  try {
    return (await import(`../../lib/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    return {}; // Return empty object or fallback messages on error
  }
}

export function generateMetadata() {
  return {
    title: 'Moonwhale',
    description: 'Moonwhale website',
  };
}

interface LayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale = params.locale;
  const isRtl = isRtlLocale(locale);

  // Tell next-intl the active locale for static rendering
  setRequestLocale(locale);

  // Fetch messages for the current locale
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Meta tags, title, etc. can be managed by Next.js metadata API */}
      </head>
      <body className={`${aeonik.variable} ${geistMono.variable} ${notoArabic.variable} antialiased h-full`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          {/* Footer will go here */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 