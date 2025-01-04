/** @type {import('tailwindcss').Config} */

import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          700: "#5348c0",
          100: "#bcbbe6",
        },
      },
    },
  },
  plugins: [
    tailwindScrollbarHide,
  ],
};


