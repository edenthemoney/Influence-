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
      // Nov 18 event: short links to the ticket page
      { source: '/tickets', destination: '/nov18', statusCode: 301 },
      { source: '/tickets/success', destination: '/nov18/success', statusCode: 301 },
      { source: '/tickets/:path*', destination: '/nov18', statusCode: 301 },
      { source: '/t', destination: '/nov18', statusCode: 301 },
      { source: '/share', destination: '/nov18/share', statusCode: 301 },
      // Retired pages (no source) -> closest live page
      { source: '/events/miami-influencer-summit-2026', destination: '/events', statusCode: 301 },
      { source: '/best-creator-marketplaces-miami', destination: '/marketplace', statusCode: 301 },
      { source: '/hire-influencers-for-restaurant', destination: '/hire-influencer-miami', statusCode: 301 },
      { source: '/how-to-promote-song-on-tiktok', destination: '/music-video-creators', statusCode: 301 },
      { source: '/influencer-marketing-brickell', destination: '/influencer-marketing-miami', statusCode: 301 },
      { source: '/influencer-marketing-coral-gables', destination: '/influencer-marketing-miami', statusCode: 301 },
      { source: '/influencer-marketing-miami-es', destination: '/influencer-marketing-miami', statusCode: 301 },
      { source: '/influencer-marketing-south-beach', destination: '/influencer-marketing-miami', statusCode: 301 },
      { source: '/influencer-marketing-wynwood', destination: '/influencer-marketing-miami', statusCode: 301 },
      { source: '/music-video-creators-miami', destination: '/music-video-creators', statusCode: 301 },
      { source: '/ugc-vs-traditional-ads', destination: '/ugc-content', statusCode: 301 },
      { source: '/book', destination: '/start', permanent: true },
      { source: '/pricing', destination: '/start', permanent: true },
      { source: '/pricing-guide', destination: '/start', permanent: true },
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/actress-models-miami', destination: '/actress-creators-miami', permanent: true },
      { source: '/book-models-miami', destination: '/book-creators-miami', permanent: true },
      { source: '/casting-agency-miami', destination: '/casting-network-miami', permanent: true },
      { source: '/event-models-miami', destination: '/event-creators-miami', permanent: true },
      { source: '/event-talent', destination: '/event-creators', permanent: true },
      { source: '/influencer-marketing-agency-miami', destination: '/influencer-marketing-miami', permanent: true },
      { source: '/instagram-models-for-hire', destination: '/instagram-creators-for-hire', permanent: true },
      { source: '/lp/hostess-agency', destination: '/lp/hostess-network', permanent: true },
      { source: '/lp/influencer-agency-miami', destination: '/lp/influencer-marketplace-miami', permanent: true },
      { source: '/lp/influencer-marketing-agency', destination: '/lp/influencer-marketing', permanent: true },
      { source: '/lp/influencer-marketing-agency-miami', destination: '/lp/influencer-marketing-miami', permanent: true },
      { source: '/lp/music-marketing-agency', destination: '/lp/music-marketing', permanent: true },
      { source: '/lp/social-media-agency-for-influencers', destination: '/lp/social-media-marketplace-for-influencers', permanent: true },
      { source: '/lp/social-media-influencer-agency', destination: '/lp/social-media-influencer-marketplace', permanent: true },
      { source: '/lp/social-media-influencer-marketing-agency', destination: '/lp/social-media-influencer-marketing', permanent: true },
      { source: '/lp/social-media-talent-agency', destination: '/lp/social-media-creator-network', permanent: true },
      { source: '/model-booking', destination: '/start', permanent: true },
      { source: '/models-for-photoshoot', destination: '/creators-for-photoshoot', permanent: true },
      { source: '/models-for-shoots', destination: '/creators-for-shoots', permanent: true },
      { source: '/music-video-booking', destination: '/music-video-creators', permanent: true },
      { source: '/music-video-models', destination: '/music-video-creators', permanent: true },
      { source: '/voiceover-talent-miami', destination: '/voiceover-creators-miami', permanent: true },
    ];
  },
};

export default nextConfig;
