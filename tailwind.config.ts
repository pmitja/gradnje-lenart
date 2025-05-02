import type { Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

const config = {
  darkMode: [ 'class' ],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      maxWidth: {
        container: "1280px",
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#f0f4ed',
          75: '#c3d2b6',
          100: '#aabf98',
          200: '#85a46c',
          300: '#6c914e',
          400: '#4c6637',
          500: '#425830',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#e8ebed',
          75: '#a0abb4',
          100: '#788894',
          200: '#3e5566',
          300: '#173247',
          400: '#102332',
          500: '#0e1f2b',
        },
        body: {
          DEFAULT: '#FFFFF',
          50: '#fefdfa',
          75: '#fcf6eb',
          100: '#fbf3e3',
          200: '#f9eed6',
          300: '#f8eace',
          400: '#aea490',
          500: '#978f7e',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          50: '#fceae9',
          75: '#f1a9a4',
          100: '#eb857f',
          200: '#e25148',
          300: '#dc2d22',
          400: '#9a1f18',
          500: '#861b15',
        },
        success: {
          DEFAULT: '#ffff',
          50: '#e9fbeb',
          75: '#a6efae',
          100: '#82e88c',
          200: '#4cde5b',
          300: '#27d739',
          400: '#1b9728',
          500: '#188323',
        },
        informative: {
          DEFAULT: '#ffff',
          50: '#e9fafd',
          75: '#a6ecf6',
          100: '#81e4f2',
          200: '#4bd9ed',
          300: '#26d1e9',
          400: '#1b92a3',
          500: '#177f8e',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee var(--duration) linear infinite',
      },
      fontFamily: {
        archivo: 'var(--font-archivo)',
      },
      backgroundImage: {
        'hero-page': "url('/page-hero.webp')",
        'image-gradient': 'linear-gradient(0, rgba(0, 0, 0, 0.5) 10%, rgba(102, 102, 102, 0) 100%)',
      },
      dropShadow: {
        'primary-button': '0px 10px 20px rgba(189, 210, 172, 0.5)',
      },
      lineHeight: {
        2: '0.5rem',
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
      },
      fontSize: {
        xxs: '0.625rem',
        xs: '0.75rem',
        '1.5xl': '1.375rem',
        '2.5xl': '1.625rem',
        '3.5xl': '2rem',
      },
    },
  },
  plugins: [ require('tailwindcss-animate'), require('daisyui') ],
} satisfies Config

export default withUt(config)
