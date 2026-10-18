import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Influence Journal — Creator Marketing Insights & Industry Trends',
  description: 'The latest on creator marketing, creator economy trends, brand collaborations, and why influencers are dominating modern advertising. Published by Influence.',
  openGraph: {
    title: 'The Influence Journal',
    description: 'Influencer marketing insights, creator economy trends, and brand collaboration strategies.',
    url: 'https://influencecreators.marketing/blog',
    siteName: 'Influence',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
