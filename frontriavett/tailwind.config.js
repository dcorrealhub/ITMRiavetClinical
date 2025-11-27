/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          blue: {
            50: '#e6f0ff',
            100: '#b3d1ff',
            200: '#80b3ff',
            300: '#4d94ff',
            400: '#1a75ff',
            500: '#0066ff',
            600: '#0052cc',
            700: '#003d99',
            800: '#002966',
            900: '#001433',
          },
          green: {
            50: '#e6f7f0',
            100: '#b3e6d1',
            200: '#80d6b3',
            300: '#4dc594',
            400: '#1ab576',
            500: '#00a86b',
            600: '#008656',
            700: '#006541',
            800: '#00432b',
            900: '#002216',
          },
        },
      },
    },
  },
  plugins: [],
}
