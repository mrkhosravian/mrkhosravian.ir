module.exports = {
  mode: "jit",
  purge: [
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
  variants: {
    extend: {}
  },
  plugins: [
    require("tailwindcss-rtl"),
  ]
};
