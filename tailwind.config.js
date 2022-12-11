/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        'dir': '#3B78FF',
        'exe': '#16C60C',
        'maroon': '#c90000',
        'lightblue': '#f2f7ff',
        'darkblue': '#252a33',
        'sm-text': '#abcbff',
      }
    },
  },
  plugins: [],
};