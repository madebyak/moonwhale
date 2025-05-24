import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  // Return both locale and messages for next-intl compatibility
  return {
    locale,
    messages: (await import(`@/lib/i18n/locales/${locale}.json`)).default,
  };
});

// Additional helper to access request config
export async function getMessages(locale: string): Promise<Record<string, unknown>> {
  try {
    return (await import(`../lib/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    return {};
  }
} 