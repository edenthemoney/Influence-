import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Influence Influencer Marketing Agency | Pricing, Services & How It Works',
  description: 'Frequently asked questions about Influence, a South Florida influencer marketing agency. Learn about pricing, how to book influencers, music promotion, UGC content, event hosting, and more.',
  openGraph: {
    title: 'FAQ — Influence Influencer Marketing Agency',
    description: 'Answers to common questions about booking influencers, music promotion, UGC content creation, event hosting, pricing, and campaign management.',
    url: 'https://influencemodels.agency/faq',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
