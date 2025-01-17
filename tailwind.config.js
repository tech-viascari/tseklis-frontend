/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00D253",
        secondary: "#025864",
        gray: "#9F9F9F",
        light: "#CEDEE1",
        dark: "#050505"
      },
    },
  },
  plugins: [],
};
