/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          light: "#EEE2DC",
          DEFAULT: "#EDC7B7",
          dark: "#BAB2B5",
          second: "#123C69",
          third: "#AC3B61",
        },
      },
      fontFamily: {
        kanit: ["Kanit"],
      },
    },
  },
  plugins: [],
});
