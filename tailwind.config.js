/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: '#BCA88D',
        ring: '#3E3F29',
        background: '#F1F0E4',
        foreground: '#3E3F29',
        primary: {
          DEFAULT: '#3E3F29',
          dark: '#2D2E1C',
          light: '#565840',
        },
        secondary: {
          DEFAULT: '#7D8D86',
          dark: '#6B7B74',
          light: '#8F9F98',
        },
        accent: {
          DEFAULT: '#BCA88D',
          dark: '#A4926F',
          light: '#D4BEAB',
        },
        dark: {
          DEFAULT: '#3E3F29',
          lighter: '#4A4C35',
          light: '#565840',
        },
        light: {
          DEFAULT: '#F1F0E4',
          darker: '#E8E6DA',
          dark: '#DFDCD0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}