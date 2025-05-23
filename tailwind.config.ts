// tailwind.config.ts
import type { Config } from 'tailwindcss'
import logical from 'tailwindcss-logical'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}'
  ],
  plugins: [logical],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          white: '#f0eff4',
          purple: '#6f00ff'
        }
      },
      fontFamily: {
        sans: ['var(--font-aeonik)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        arabic: ['var(--font-noto-arabic)', 'sans-serif'],
      }
    }
  }
}
export default config
