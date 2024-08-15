/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/]
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  experimental: {
    images: {
        allowFutureImage: true
    }
  },
};

module.exports = nextConfig;
