// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        georgia: ["Georgia", "serif"], // Títulos
        avenir: ["Avenir", "sans-serif"], // Subtítulos
        avenirLight: ["Avenir Light", "sans-serif"], // Placeholders
      },
    },
  },
  plugins: [],
};
