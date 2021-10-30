const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    localePath: path.resolve('./public/locales')
    // reloadOnPrerender: true,
  },
};
