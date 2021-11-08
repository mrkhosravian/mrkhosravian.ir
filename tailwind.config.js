const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx',
    'src/templates/**/*.tsx',
    'src/posts/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'mr-bg-gray': '#F5F5F7',
        'mr-gray': '#222832',
      }
    },
  },
  plugins: [],
};
