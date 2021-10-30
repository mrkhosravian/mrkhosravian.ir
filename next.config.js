/** @type {import("next").NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["wp.mrkhosravian.ir"]
  },
  i18n: i18n
};
