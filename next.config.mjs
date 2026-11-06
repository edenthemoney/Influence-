/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  staticPageGenerationTimeout: 180,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      { source: '/book', destination: '/model-booking', permanent: true },
      { source: '/pricing', destination: '/model-booking', permanent: true },
      { source: '/pricing-guide', destination: '/model-booking', permanent: true },
      { source: '/solutions', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
