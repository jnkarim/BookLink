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
        'Favourite': '#FF5841',
      },
      fontFamily: {
        'primary': ["Space Mono", "sans-serif"],
        'secondary': ["Karla", "sans-serif"],
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { 
            opacity: "0", 
            transform: "translateY(20px) scale(0.9)", // Start slightly below and scaled down
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)", // End in original position and scale
          },
        },
      },
    },
  },
  plugins: [],

  
}
