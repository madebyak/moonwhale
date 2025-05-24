'use client';
import { FC } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

const LocaleSwitcher: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as typeof locales[number] || 'en';

  const switchLocale = (targetLocale: typeof locales[number]) => {
    router.push(pathname, { locale: targetLocale });
  };

  return (
    <div role="group" aria-label="Switch language" className="inline-flex items-center text-white">
      {/* English */}
      <button
        onClick={() => switchLocale('en')}
        className={`px-1 font-mono nav-hover-line ${currentLocale === 'en' ? 'text-brand-purple' : ''}`}
      >
        ENG
      </button>
      {/* Divider: use a border for reliable height and visibility */}
      <span aria-hidden="true" className="mx-2 inline-block h-5 border-l border-current" />
      {/* Arabic */}
      <button
        onClick={() => switchLocale('ar')}
        className={`px-1 font-arabic nav-hover-line ${currentLocale === 'ar' ? 'text-brand-purple' : ''}`}
      >
        عربي
      </button>
    </div>
  );
};

export default LocaleSwitcher; 