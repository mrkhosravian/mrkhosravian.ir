module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx',
    'src/templates/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'etour-bg-gray': '#F5F5F7',
        'etour-gray': '#222832',
      }
    },
  },
  variants: {
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
  plugins: [],
};
