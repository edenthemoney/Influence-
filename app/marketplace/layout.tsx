import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Influencers — Book Verified Talent for UGC, Music & Events',
  description: 'Browse Influence\'s roster of verified influencers in South Florida. Book models for UGC content, music videos, brand campaigns, and event hosting. Talent with credits from Forbes, Fenty Beauty, Sean Paul, and more.',
  openGraph: {
    title: 'Browse Influencers — Influence Talent Marketplace',
    description: 'Verified influencers available for UGC content, music videos, events, and brand campaigns. South Florida\'s premier talent roster.',
    url: 'https://influencemodels.agency/marketplace',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/marketplace',
  },
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
