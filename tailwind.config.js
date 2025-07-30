/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8a1f4a',
          light: '#a94a6a',
        },
        secondary: '#cfa3b3',
        accent1: '#2e1e4a',
        accent2: {
          DEFAULT: '#4a3a6a',
          light: '#6a5a8a',
        },
        base: 'rgb(236, 225, 237)',
        text: '#2e1e4a',
        'baby-powder': '#fcfcfb',
        'glass-bg': 'rgba(241, 194, 207, 0.12)',
        'glass-shadow': 'rgba(243, 215, 223, 0.25)',
        'result-cta-shadow': 'rgba(138, 31, 74, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
