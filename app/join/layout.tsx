import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Influence — Apply to Be a Model | Miami & Boca Raton FL',
  description: 'Apply to join Influence, South Florida\'s premier influencer and modeling agency. Get booked for UGC content, music videos, brand campaigns, and event hosting in Miami and Boca Raton.',
  openGraph: {
    title: 'Join Influence — Apply to Be a Model',
    description: 'Get booked for UGC content, music videos, brand campaigns, and events. Apply to join our roster.',
    url: 'https://influencemodels.agency/join',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/join',
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
