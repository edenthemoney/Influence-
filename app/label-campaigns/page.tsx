import PersonaLanding from '../components/PersonaLanding';

export const metadata = {
  title: 'Label Campaigns & Large-Scale Music Videos | Influencer Agency Miami — Influence Agency',
  description: 'Full-service label campaigns and large-scale music video productions with 10 to 100+ verified creators. Influencer agency in Miami. From $8,500.',
  openGraph: {
    title: 'Label Campaigns & Large-Scale Music Videos | Influencer Agency Miami',
    description: 'Full-service label campaigns and large-scale productions with 10 to 100+ creators. From $8,500.',
    url: 'https://influencemodels.agency/label-campaigns',
  },
};

export default function LabelCampaignsPage() {
  return (
    <PersonaLanding
      title="Label Campaigns & Large-Scale Music Videos"
      description="Full-service label campaigns and large-scale music video productions with 10 to 100+ verified creators. From $8,500."
      tagline="Full-Service · Label-Ready"
      headline="Label Campaigns\nThat Dominate."
      subheadline="Full-service campaigns for record labels, major artists, and enterprise brands. From 10-creator rollouts to 100+ model productions, we handle casting, coordination, and launch."
      heroImage="/images/Des/des-5.jpg"
      heroImageAlt="Large-scale music video production"
      primaryCta={{ text: 'Plan a Label Campaign', href: '/quote?type=label' }}
      secondaryCta={{ text: 'Talk to a Rep', href: '/quote?type=label' }}
      painPoints={[
        'You need 20+ models or creators for a major release',
        'In-house coordination slows down your launch timeline',
        'You need a campaign that looks like a label pushed it',
      ]}
      solutionTitle="We Build the Whole Machine."
      solutionBody="From creative direction to casting to launch day, we run the entire campaign. You get a coordinated, label-ready rollout without the internal overhead."
      solutionFeatures={[
        '10 to 100+ creators per campaign',
        'Synchronized multi-platform launches',
        'Dedicated campaign manager + team',
        'Custom creative direction and styling',
        'Real-time analytics and reporting',
      ]}
      packages={[
        {
          name: 'Viral Launch',
          price: 8500,
          tagline: '10 Creators',
          features: ['10 verified creators', '2 reels each (20 total)', '6-hour synchronized launch', '7-day delivery', 'Dedicated campaign manager', '1M+ combined reach'],
          cta: 'Plan Launch',
          href: '/quote?type=label',
        },
        {
          name: 'Feed Takeover',
          price: 15000,
          tagline: 'Most Popular',
          features: ['20 verified creators', '2 reels each (40 total)', '2-hour synchronized launch', '10-day delivery', 'Campaign manager + strategist', '2M+ combined reach'],
          cta: 'Plan Takeover',
          href: '/quote?type=label',
          popular: true,
        },
        {
          name: 'Agency Campaign',
          price: 35000,
          tagline: '50 Creators',
          features: ['50 verified creators', '2 reels each (100 total)', 'Simultaneous launch', '14-day delivery', 'Full campaign team', '5M+ combined reach'],
          cta: 'Plan Campaign',
          href: '/quote?type=label',
        },
      ]}
      trustBadges={['Label-Ready', 'Dedicated Manager', '10M+ Reach']}
      socialProof={[
        { stat: '100M+', label: 'Campaign Reach' },
        { stat: '50+', label: 'Label Clients' },
        { stat: '100+', label: 'Large-Scale Videos' },
        { stat: '7-day', label: 'Avg. Setup' },
      ]}
      faq={[
        { q: 'How do I book a label campaign with an influencer agency in Miami?', a: 'Start with a custom quote. We’ll review your artist, release timeline, and budget, then build a campaign with 10 to 100+ verified creators.' },
        { q: 'Can you handle a full music video production?', a: 'Yes. We provide talent casting and on-set coordination for music videos of any scale, from 10 to 50+ models.' },
        { q: 'Do you offer retainer contracts for labels?', a: 'Yes. Labels and enterprise brands can book monthly retainer packages with dedicated teams and priority access.' },
        { q: 'Can you work with our creative director?', a: 'Absolutely. We integrate with your in-house team and execute against your creative direction.' },
        { q: 'What reporting do you provide for label campaigns?', a: 'We provide real-time dashboards, launch reports, and weekly executive summaries with reach, engagement, and content performance.' },
        { q: 'How do I market my music as an independent artist or label?', a: 'Combine a music video with creator reactions, UGC content, and a coordinated influencer campaign. We run the full rollout for you.' },
      ]}
      finalCta={{ text: 'Plan a Label Campaign', href: '/quote?type=label' }}
      hidePackagePrices
    />
  );
}
