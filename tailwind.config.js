module.exports = {
  mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx',
    'src/templates/**/*.tsx',
    'src/posts/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        'mr-bg-gray': '#F5F5F7',
        'mr-gray': '#222832',
      }
    },
  },
  variants: {
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
  plugins: [],
};
