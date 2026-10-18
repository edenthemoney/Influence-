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
      { source: '/nov18', destination: '/tickets', permanent: false },
    ];
  },
};

export default nextConfig;
