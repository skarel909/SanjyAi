/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': {
          '50': '#f9f9f9',
          '100': '#f3f3f3',
          '200': '#e8e8e8',
          '300': '#d4d4d4',
          '400': '#a1a1a1',
          '500': '#808080',
          '600': '#666666',
          '700': '#333333',
          '800': '#1a1a1a',
          '900': '#0a0a0a',
          '950': '#000000',
        },
        'sanjy': {
          'primary': '#ffffff',
          'secondary': '#e0e0e0',
          'accent': '#b8b8b8',
          'bg': '#0a0a0a',
          'surface': '#1a1a1a',
          'border': '#2a2a2a',
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'typing': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 0.7s infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
