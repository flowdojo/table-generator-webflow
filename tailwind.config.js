/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor : {
        "light-white" : "#CCCCCC",
        "primary" : "#A1A7BE",
        "code-block" : "#BDC8EC",
        "line-break" : "#242529",
        "purple" : "#5F48E9"

      },
      backgroundColor : {
        "primary-dark" : "#101116",
        "line-break" : "#242529",
        "code-block" : "#202229",
        "purple" : "#5F48E9"
      }
    },
  },
  plugins: [],
}

