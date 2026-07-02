/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        latte: {
          50:  '#fdf8f3',
          100: '#f5ede0',
          200: '#ead9c2',
          300: '#d9bfa0',
          400: '#c4a07a',
          500: '#b08050',
          600: '#8f6538',
          700: '#6e4e2a',
          800: '#4d371e',
          900: '#2e2012',
        },
        cream: '#fdf8f3',
        mocha: '#6e4e2a',
        espresso: '#2e2012',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
