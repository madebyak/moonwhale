import localFont from 'next/font/local'
import { Geist_Mono } from 'next/font/google'
import { Noto_Sans_Arabic } from 'next/font/google'

export const aeonik = localFont({
  src: [
    {
      path: '../../public/fonts/AeonikPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AeonikPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AeonikPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AeonikPro-Black.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-aeonik'
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono'
})

export const notoArabic = Noto_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-arabic'
}) 