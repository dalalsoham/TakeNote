/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //colors used in the project
      colors: {
        primary: "#cc1d94",
        secondary: "#8333f2",
      },
    },
  },
  plugins: [],
}

