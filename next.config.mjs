/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
