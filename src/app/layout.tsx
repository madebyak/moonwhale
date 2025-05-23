import './globals.css';
import { aeonik, geistMono, notoArabic } from './fonts';
import { ReactNode } from 'react';
import Script from 'next/script';

// RootLayoutProps might not be strictly necessary if it only passes children
interface RootLayoutProps {
  children: ReactNode;
}

// This root layout now just passes children through, as <html> and <body>
// are handled by src/app/[locale]/layout.tsx for localized routes.
// The metadata export can remain here as a default or be removed if
// all metadata is handled within [locale] pages/layouts.
export const metadata = {
  title: 'Moonwhale',
  description: 'Moonwhale website',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
