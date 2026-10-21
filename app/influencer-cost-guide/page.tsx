import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: 'How Much Does It Cost to Hire an Influencer? | Influence',
  description: 'How much it costs to hire an influencer: Influence campaigns start at $300, event creators $400 per creator. What drives the price, explained plainly.',
  alternates: { canonical: 'https://influencecreators.marketing/influencer-cost-guide' },
};

const props: GeoPageProps = {
  path: '/influencer-cost-guide',
  eyebrow: 'Cost Guide',
  h1: 'Influencer Marketing Costs, Explained',
  intro: 'There is no single price for an influencer. Rates vary widely by creator, deliverable and rights. This guide explains what moves the price so you can budget and compare quotes.',
  serviceName: 'Influencer marketing and creator booking',
  serviceType: 'Influencer marketing',
  serviceDescription: 'Influence books creators and influencers for brand content, posts and events in South Florida. Projects are quoted on scope.',
  cta: { label: 'Get a quote', href: '/start' },
  sections: [
    {
      heading: 'How much does it cost to hire an influencer?',
      answer: 'At Influence, campaigns start at $300. Event creators are $400 per creator and commercial production starts at $599. Anything custom is quoted on scope. Across the industry, rates vary widely, so contact us for a number on your exact project.',
    },
    {
      heading: 'What drives the price',
      answer: 'Audience size and engagement, what they make, where it runs, and for how long.',
      bullets: [
        'Audience: nano, micro, mid-tier and macro creators charge differently',
        'Deliverables: number of posts, stories, reels or raw videos',
        'Production: on-location filming, editing, travel',
        'Exclusivity: not working with competitors for a period',
        'Timeline: rush delivery usually costs more',
      ],
    },
    {
      heading: 'Influence prices published on this site',
      answer: 'These are the starting prices currently listed on our service pages.',
      bullets: [
        'Campaigns: start at $300',
        'Event creators: $400 per creator (see Event Creators)',
        'Commercials: from $599 (see Commercials)',
        'UGC reels: see the UGC creators page for current packages',
      ],
    },
    {
      heading: 'UGC vs influencer posts',
      answer: 'UGC pays for content you post yourself. Influencer posts pay for the creator\u2019s audience. They are priced differently.',
    },
    {
      heading: 'Agency vs hiring direct',
      answer: 'Going direct can cost less but you handle sourcing, contracts, briefs and follow-up. An agency handles those and matches creators to the brief.',
    },
    {
      heading: 'Disclosure',
      answer: 'Paid or gifted posts must be disclosed clearly, for example with #ad, under FTC rules.',
    },
  ],
  faqs: [
    { q: 'What is the cheapest way to start?', a: 'Our campaigns start at $300. Send your goals and budget and we tell you what fits.' },
    { q: 'Do you publish fixed rates?', a: 'Some services list starting prices on their service pages. Custom campaigns are quoted on scope.' },
  ],
  sources: [
    { label: 'FTC: Disclosures 101 for Social Media Influencers', url: 'https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers' },
  ],
  related: [
    { label: 'UGC creators', href: '/ugc-creators-florida' },
    { label: 'Hire an influencer in Miami', href: '/hire-influencer-miami' },
    { label: 'Commercials', href: '/services/commercials' },
    { label: 'Event creators', href: '/services/events' },
    { label: 'All services', href: '/services' },
  ],
};

export default function Page() {
  return <GeoLanding {...props} />;
}
