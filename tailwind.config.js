/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl-yellow': '0 35px 35px rgba(255, 255, 53, 0.6)'
      },
      keyframes: {
        moveY: {
          'to': { transform: 'translateY(20px)' }
        }
      },
      boxShadow: {
        'md-light':'0 2px 6px -1px rgba(255, 255, 223, 1)'
      },
      animation: {
        'move-top-down': 'moveY 2s infinite ease alternate'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};

