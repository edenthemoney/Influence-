import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Model or Influencer in Miami — UGC, Music Video, Events | From $300',
  description: 'Book a verified model or influencer in Miami in under 2 minutes. Choose from UGC reels, music reaction videos, music video models, event hosting, and business content creation. Packages from $300. Secure Stripe checkout.',
  openGraph: {
    title: 'Book a Model or Influencer in Miami — Influence',
    description: 'Book verified models for UGC, music promo, events, and business content. From $300. Instant checkout.',
    url: 'https://influencemodels.agency/model-booking',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/model-booking',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Book a Model or Influencer in Miami',
  description: 'Step-by-step guide to booking a verified model or influencer for UGC content, music videos, events, or business promotion through Influence Models Agency in South Florida.',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '300' },
  step: [
    { '@type': 'HowToStep', name: 'Choose your service', text: 'Select the service you need: UGC & Reels, Music Reactions, Music Video Models, Business Content, Photo Shoot, Event Hosting, Bottle Girls, or Commercial. Each service has specific packages starting at $300.', url: 'https://influencemodels.agency/model-booking' },
    { '@type': 'HowToStep', name: 'Select booking type', text: 'Choose between a one-time booking for a single project or a monthly retainer for ongoing content creation. In-person services default to one-time bookings.', url: 'https://influencemodels.agency/model-booking' },
    { '@type': 'HowToStep', name: 'Enter your details', text: 'Provide your name, phone, email, and project details including date, location (for in-person bookings), and any model preferences from our talent roster.', url: 'https://influencemodels.agency/model-booking' },
    { '@type': 'HowToStep', name: 'Select your package and pay', text: 'Choose the package that fits your budget using the budget slider. Packages range from $300 for a solo booking to $6,000+ for large campaigns. Complete secure checkout via Stripe.', url: 'https://influencemodels.agency/model-booking' },
  ],
};

export default function ModelBookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {children}
    </>
  );
}
