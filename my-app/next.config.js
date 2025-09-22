/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle PDF.js worker
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': isServer ? false : 'pdfjs-dist/build/pdf',
    };
    return config;
  },
};

module.exports = nextConfig; 