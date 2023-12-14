/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "481px",
        md: "744px", // tablet
        xlg: "1057px",
        lg: "1366px", // desktop
        xxl: "1400px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
