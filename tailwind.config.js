module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        "height": "height",
        "width-height": "height width"
      }
    }
  },
  plugins: [
    require("tailwindcss-rtl"),
  ]
};
