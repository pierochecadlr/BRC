/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50:  '#f7f6f3',
          100: '#eeece6',
          200: '#ddd9d0',
          300: '#c5bfb3',
          400: '#a89f90',
          500: '#8c8270',
          600: '#736758',
          700: '#5c5245',
          800: '#3d3630',
          900: '#1f1b17',
          950: '#0f0d0b',
        },
        navy: {
          50:  '#f0f3fa',
          100: '#dce4f3',
          200: '#b9c9e7',
          300: '#8aaad6',
          400: '#5a87c2',
          500: '#3768ae',
          600: '#264f91',
          700: '#1e3d74',
          800: '#172d56',
          900: '#111f3c',
          950: '#080f1e',
        },
        crimson: {
          50:  '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#f83b3b',
          600: '#e51c1c',
          700: '#c11414',
          800: '#9f1414',
          900: '#841818',
          950: '#480707',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
