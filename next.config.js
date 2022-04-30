/** @type {import("next").NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["mrkhosravian.s3.ir-thr-at1.arvanstorage.com"]
  },
  i18n: i18n,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
};
