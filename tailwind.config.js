/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c0d7ff',
          300: '#a0c3ff',
          400: '#80afff',
          500: '#609bff',
          600: '#4070cc',
          700: '#2d4d99',
          800: '#1a2f66',
          900: '#0a1a3d',
          950: '#050d1f',
        },
        primary: {
          50: '#e6f0ff',
          100: '#cce1ff',
          200: '#99c2ff',
          300: '#66a4ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
      },
      backgroundImage: {
        'gradient-dark': 'radial-gradient(circle at 15% 20%, #163f93 0%, #0b2661 28%, #06183f 58%, #030d25 100%)',
        'gradient-accent': 'linear-gradient(120deg, #2563eb 0%, #0ea5e9 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        floatIn: 'floatIn 0.6s ease-out forwards',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
