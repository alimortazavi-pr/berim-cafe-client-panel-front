/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "api.berimcafe.ir",
      "api-panel.berimcafe.org",
      "cloud.berimcafe.ir",
      "beim-cafe-panel.liara.run",
      "berim-cafe-back-production.up.railway.app",
    ],
  },
});
