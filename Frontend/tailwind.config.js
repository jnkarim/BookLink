/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
    colors: {
      'primary': '#FFCE1A',
      'secondary': '#0D0842',
      'blackBG': '#F3F3F3',
      'Favourite': '#FF5841'
    },
  },
    fontFamily:{
      'primary': [ "Space Mono", "sans-serif" ],
      'secondary': [ "Karla", "sans-serif"],
    },
  },
  plugins: [],
}