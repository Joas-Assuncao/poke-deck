/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          450: '#FFE447',
        },
        red: {
          450: '#FF1F1F',
        },
        blue: {
          350: '#5DB9FF',
          650: '#363B81',
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}