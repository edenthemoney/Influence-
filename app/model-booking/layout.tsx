import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Influencers — UGC Content, Music Promo, Events | From $300',
  description: 'Book verified influencers in under 2 minutes. Choose from UGC content creation, music reaction videos, event hosting, and model bookings. Packages start at $300. Secure Stripe checkout.',
  openGraph: {
    title: 'Book Influencers — Influence',
    description: 'Book verified influencers for UGC, music promo, and events. Packages from $300. Instant Stripe checkout.',
    url: 'https://influencemodels.agency/model-booking',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/model-booking',
  },
};

export default function ModelBookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
