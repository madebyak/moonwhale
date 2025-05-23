'use client';
import { FC } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Spiral as Hamburger } from 'hamburger-react';
import useNavStore from '@/lib/store/useNavStore';
import LocaleSwitcher from '../LocaleSwitcher';
import Container from '@/components/layout/Container';

const navItems = [
  { labelKey: 'home', path: '' },
  { labelKey: 'about', path: 'about' },
  { labelKey: 'services', path: 'services' },
  { labelKey: 'projects', path: 'projects' },
  { labelKey: 'products', path: 'products' },
  { labelKey: 'lab', path: 'lab' },
  { labelKey: 'contact', path: 'contact' },
];

const Navbar: FC = () => {
  const { locale } = useParams() as { locale: string };
  const t = useTranslations('common.navbar');
  const isOpen = useNavStore((state) => state.isOpen);
  const toggle = useNavStore((state) => state.toggle);

  return (
    <header className="sticky top-0 z-50 w-full bg-black shadow-md">
      <nav>
        <Container className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Home" className="ms-0">
            <Image
              src="/MW_logo_web.svg"
              alt="Moonwhale Logo"
              width={150}
              height={75}
              priority
            />
          </Link>
          {/* Grouped navigation, switcher, and hamburger */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-white">
            <ul className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              {navItems.map(({ labelKey, path }) => (
                <li key={labelKey}>
                  <Link
                    href={`/${path}`}
                    className={`text-white font-medium nav-hover-line ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
            <LocaleSwitcher />
            <div className="p-2">
              <Hamburger
                toggled={isOpen}
                toggle={toggle}
                size={24}
                color="currentColor"
                label={isOpen ? 'Close menu' : 'Open menu'}
              />
            </div>
          </div>
        </Container>
      </nav>
      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ labelKey, path }) => (
              <Link
                key={labelKey}
                href={`/${path}`}
                className={`block px-3 py-2 rounded-md text-base font-medium text-white nav-hover-line ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}
                onClick={toggle}
              >
                {t(labelKey)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 