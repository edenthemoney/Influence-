import PersonaLanding from '../components/PersonaLanding';

export const metadata = {
  title: 'Book Social Media Influencers | Influencer Marketing Agency — Influence Agency',
  description: 'Book social media influencers for coordinated campaigns. Instagram, TikTok, and YouTube creator rollouts with synchronized launches and performance tracking. From $2,000.',
  openGraph: {
    title: 'Book Social Media Influencers | Influencer Marketing Agency',
    description: 'Book social media influencers for coordinated campaigns. Verified creators. From $2,000.',
    url: 'https://influencemodels.agency/influencer-campaigns',
  },
};

export default function InfluencerCampaignsPage() {
  return (
    <PersonaLanding
      title="Influencer Marketing Campaigns"
      description="Launch coordinated influencer campaigns with verified creators. Multi-influencer rollouts, synchronized launches, and performance tracking. From $2,000."
      tagline="Coordinated Campaigns · Nationwide"
      headline="Launch a Creator\nCampaign That Hits."
      subheadline="We coordinate 3 to 100+ creators around a single launch. Same message, synchronized posting, real reach, and performance tracking from day one."
      heroImage="/images/Des/des-1.jpg"
      heroImageAlt="Influencer campaign launch"
      primaryCta={{ text: 'Start a Campaign', href: '/quote?type=campaign' }}
      secondaryCta={{ text: 'Talk to Strategy', href: '/quote?type=campaign' }}
      painPoints={[
        'One influencer post doesn’t move the needle',
        'Coordinating multiple creators is a logistical nightmare',
        'You can’t tell if the campaign actually drove results',
      ]}
      solutionTitle="We Run the Campaign. You Get the Reach."
      solutionBody="From creator selection to content calendar to launch day, we manage the full campaign. You get a coordinated rollout that looks organic and performs like paid media."
      solutionFeatures={[
        '3 to 100+ verified creators per campaign',
        'Synchronized launch windows',
        'Trend-optimized content and captions',
        'Performance dashboard + weekly reports',
        'Dedicated campaign coordinator',
      ]}
      packages={[
        {
          name: '3 Creator Collab',
          price: 2250,
          tagline: 'Start Here',
          features: ['3 verified creators', '2 reels each (6 total)', 'IG + TikTok distribution', '24-hour launch window', 'Performance report'],
          cta: 'Book Collab',
          href: '/quote?type=campaign',
        },
        {
          name: '5 Creator Rollout',
          price: 3500,
          tagline: 'Most Popular',
          features: ['5 verified creators', '2 reels each (10 total)', 'IG + TikTok distribution', '12-hour launch window', 'Trend optimization', 'Performance dashboard'],
          cta: 'Book Rollout',
          href: '/quote?type=campaign',
          popular: true,
        },
        {
          name: '7 Creator Blitz',
          price: 5000,
          tagline: 'Scale Up',
          features: ['7 verified creators', '2 reels each (14 total)', 'Multi-platform blitz', '8-hour launch window', 'Dedicated coordinator', 'Weekly reports'],
          cta: 'Book Blitz',
          href: '/quote?type=campaign',
        },
      ]}
      trustBadges={['Verified Creators', 'Coordinated Launch', 'Performance Tracking']}
      socialProof={[
        { stat: '1M+', label: 'Combined Reach' },
        { stat: '500+', label: 'Campaigns Run' },
        { stat: '3.5x', label: 'Avg. Engagement Lift' },
        { stat: '7-day', label: 'Avg. Campaign Setup' },
      ]}
      faq={[
        { q: 'How do I book social media influencers for a campaign?', a: 'Start by selecting your campaign size on our quote page. We’ll match you with verified creators, send a roster for approval, and coordinate the launch.' },
        { q: 'How long does an influencer campaign take to set up?', a: 'Most campaigns are live within 5–7 days. Larger campaigns with 10+ creators may take 10–14 days for full coordination.' },
        { q: 'Can I approve the creators before launch?', a: 'Yes. We send you a curated roster for approval before any content is created or posted.' },
        { q: 'Where do I find social media influencers near me?', a: 'Influence Agency has a nationwide network of verified creators. We match you to influencers based on your audience, location, and campaign goals.' },
        { q: 'Do you track influencer campaign performance?', a: 'Every campaign includes a performance dashboard with reach, engagement, and content delivery tracking.' },
        { q: 'What platforms do you cover for influencer campaigns?', a: 'Instagram, TikTok, YouTube Shorts, and Snapchat. We can add Facebook, X, and Twitch for larger campaigns.' },
      ]}
      finalCta={{ text: 'Start a Campaign', href: '/quote?type=campaign' }}
      hidePackagePrices
    />
  );
}
