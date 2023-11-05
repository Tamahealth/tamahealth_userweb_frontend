/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  jit: true,
  theme: {
    extend: {
      margin: {
        "-1": "-0.25rem",
        "-2": "-0.5rem",
        "-3": "-0.75rem",
        "-4": "-1rem",
        "-5": "-1.25rem",
        "-6": "-1.5rem",
        "-8": "-2rem",
        "-10": "-2.5rem",
        "-12": "-3rem",
        "-16": "-4rem",
        "-20": "-5rem",
        "-24": "-6rem",
        "-32": "-8rem",
        "-40": "-10rem",
        "-48": "-12rem",
        "-56": "-14rem",
        "-64": "-16rem",
      },
      // tailwind.config.js
      borderOpacity: {
        '12': '0.12',
      },
      transitionTimingFunction: {
        '300': 'cubic-bezier(0.3, 0, 0.7, 1)',
      },
      outlineOpacity: {
        '50': '0.5',
      },
      // Enable custom width classes
      width: {
        8: "2rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
      },
      fontFamily: { display: ["Poppins", "sans-serif"] },
    },
  },
  plugins: [],
};
