/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'n-blue': '#003366',
        'h-blue': '#00284d',
        'l-gray': '#D3D3D3'
      },
      minHeight:{
        'fit':'90vh'
      }
    },
  },
  plugins: [],
}

