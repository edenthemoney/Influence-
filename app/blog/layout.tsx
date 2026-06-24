import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Influence Journal — Influencer Marketing Insights & Industry Trends',
  description: 'The latest on influencer marketing, creator economy trends, brand collaborations, and why influencers are dominating modern advertising. Published by Influence Models Agency.',
  openGraph: {
    title: 'The Influence Journal',
    description: 'Influencer marketing insights, creator economy trends, and brand collaboration strategies.',
    url: 'https://influencemodels.agency/blog',
    siteName: 'Influence Models Agency',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
