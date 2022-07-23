/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        lg: "1rem",
        md: ".875rem",
      },
      screens: {
        desktop: { max: "1248px" },
        ipad: { max: "1024px" },
        mobile: { max: "640px" },
      },
      colors: {
        accent: "#A18A68",
        white: "#FFF",
        black: "#000",
        "dark-gray": "#707070",
        gray: "#D8D8D8",
        "light-grey": "#EFEFEF",
      },
    },
  },
  plugins: [],
};
