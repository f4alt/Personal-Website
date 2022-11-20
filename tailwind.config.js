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
        'background': '#f2f7ff',
      }
    },
  },
  plugins: [],
};