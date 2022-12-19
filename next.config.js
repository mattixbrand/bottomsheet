/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   // Important: return the modified config
  //   return config;
  // },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};

module.exports = nextConfig;
