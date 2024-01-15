/** @type {import('tailwindcss').Config} */
export default {
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
};
