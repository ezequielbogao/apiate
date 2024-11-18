const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azure: {
          '50': '#f5f6fa',
          '100': '#e9ecf5',
          '200': '#cfd7e8',
          '300': '#a4b3d5',
          '400': '#738bbd',
          '500': '#516ea6',
          '600': '#445d97',
          '700': '#334571',
          '800': '#2e3c5e',
          '900': '#2a3450',
          '950': '#1c2235',
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
});