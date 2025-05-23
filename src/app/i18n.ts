import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/lib/i18n/config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Return both locale and messages for next-intl compatibility
  return {
    locale,
    messages: (await import(`@/lib/i18n/locales/${locale}.json`)).default,
  };
}); 