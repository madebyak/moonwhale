import type { Metadata } from 'next';
import './globals.css';
import SmoothScrolling from '@/components/ui/SmoothScrolling';

export const metadata: Metadata = {
  title: 'Moonwhale',
  description: 'Moonwhale website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
