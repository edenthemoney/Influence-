import PersonaLanding from '../components/PersonaLanding';

export const metadata = {
  title: 'Paid Instagram Shoutouts & Social Media Promo | UGC Creators — Influence Agency',
  description: 'Get paid Instagram shoutouts, social media promo, and authentic UGC content from verified creators. Product reviews, testimonial videos, and branded reels. From $300.',
  openGraph: {
    title: 'Paid Instagram Shoutouts & Social Media Promo',
    description: 'Get paid Instagram shoutouts, UGC content, and creator reviews. From $300.',
    url: 'https://influencemodels.agency/ugc-content',
  },
};

export default function UgcContentPage() {
  return (
    <PersonaLanding
      title="UGC Content & Creator Reviews"
      description="Get authentic UGC content, product reviews, and testimonial videos from verified creators. Delivered ready to post. Nationwide. From $300."
      tagline="Remote · Nationwide Delivery"
      headline="Get Creator Content\nThat Converts."
      subheadline="Verified creators make reels, reviews, and testimonial videos for your brand. You get HD content delivered to your inbox — ready to post or run as ads."
      heroImage="/images/Ferrari/ferrari-1.jpg"
      heroImageAlt="UGC content creator"
      primaryCta={{ text: 'Get My First Reel', href: '/model-booking?service=ugc' }}
      secondaryCta={{ text: 'See All Packages', href: '/pricing' }}
      painPoints={[
        'You need content but don’t have time to create it',
        'Your ads look too polished and don’t convert',
        'You can’t find creators who match your brand vibe',
      ]}
      solutionTitle="Content That Looks Organic. Because It Is."
      solutionBody="We match you with creators who genuinely fit your brand. They film, edit, and deliver scroll-stopping content you can use across every platform."
      solutionFeatures={[
        'Branded reels, reviews, and testimonials',
        'Matched to your brand aesthetic',
        'HD vertical video delivered in 3–5 days',
        'Multiple hooks and formats for A/B testing',
        'Usage rights for organic and paid ads',
      ]}
      packages={[
        {
          name: 'Single Reel',
          price: 300,
          tagline: 'Start Here',
          features: ['1x 30-second Reel or TikTok', 'Professional editing & trending audio', 'Single platform posting', '3-day delivery', '1 revision included'],
          cta: 'Order Reel',
          href: '/model-booking?service=ugc&package=single-ugc',
        },
        {
          name: 'Dual Reel',
          price: 500,
          tagline: 'Most Popular',
          features: ['2x 30-second reels (IG + TikTok)', 'Dual platform posting', 'Professional editing & transitions', '3-day delivery', '2 revisions included'],
          cta: 'Order Dual Reel',
          href: '/model-booking?service=ugc&package=double-ugc',
          popular: true,
        },
        {
          name: '5-Reel Pack',
          price: 1200,
          tagline: 'Scale Up',
          features: ['5x premium reels', 'Multi-platform distribution', 'Custom captions & CTAs', '5-day delivery', '3 revisions included'],
          cta: 'Order 5-Reel Pack',
          href: '/model-booking?service=ugc&package=five-ugc',
        },
      ]}
      trustBadges={['Nationwide', '3–5 Day Delivery', 'Usage Rights Included']}
      socialProof={[
        { stat: '10K+', label: 'Reels Delivered' },
        { stat: '300+', label: 'Brand Clients' },
        { stat: '48hr', label: 'Avg. Turnaround' },
        { stat: '3x', label: 'Avg. ROAS Lift' },
      ]}
      faq={[
        { q: 'What are paid Instagram shoutouts?', a: 'Paid Instagram shoutouts are creator-made posts or reels promoting your brand, product, or music in exchange for a fee. We deliver HD video files you can post or run as ads.' },
        { q: 'Do I ship my product for a UGC review?', a: 'For product reviews, yes. For testimonial and lifestyle content, we can work with your existing photos, brief, or digital product.' },
        { q: 'Can I use UGC videos as paid ads?', a: 'Yes. All UGC packages include usage rights for organic posting and paid advertising on Instagram, TikTok, YouTube, and Facebook.' },
        { q: 'How do I grow followers with social media promo?', a: 'The fastest way to grow followers is consistent creator content, paid shoutouts, and trending reels. Our creators produce authentic content that drives engagement and follows.' },
        { q: 'How do I choose the right creator?', a: 'You can browse the marketplace or let us match you based on your brand, audience, and content goals.' },
        { q: 'Where do I find social media influencers for my brand?', a: 'Influence Agency has a curated network of verified creators. You can browse by niche, location, and follower count, or let us match you.' },
        { q: 'What if I don’t like the UGC content?', a: 'Every package includes revisions. We work with the creator until you’re happy with the final cut.' },
      ]}
      finalCta={{ text: 'Get My First Reel', href: '/model-booking?service=ugc' }}
      hidePackagePrices
    />
  );
}
