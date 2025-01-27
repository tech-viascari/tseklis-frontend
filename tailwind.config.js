const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Open Sans", "sans-serif"], // Using Poppins as the first choice
    },
    extend: {
      colors: {
        primary: "#00D253",
        secondary: "#025864",
        gray: "#9F9F9F",
        light: "#CEDEE1",
        dark: "#050505",
        "light-gray": "#D9D9D9",
      },
    },
  },
  plugins: [],
});
