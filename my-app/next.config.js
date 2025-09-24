/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  // basePath: '/frontapp',        // matches your Tomcat context path
  // assetPrefix: '/frontapp',     // ensures JS/CSS links work under /frontapp
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