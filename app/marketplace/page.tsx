import type { Metadata } from 'next';
import MarketplaceHome from '../components/home/MarketplaceHome';

const description = 'Influence matches restaurants, nightclubs, hotels, resorts, and lounges with influencers who film the room. On camera: Deseray Marie at Prime Time, the DessertZ Food Truck, and Oia in Fort Lauderdale.';

export const metadata: Metadata = {
  title: 'For the room — venue influencer marketplace',
  description,
  alternates: {
    canonical: 'https://influencecreators.marketing/marketplace',
  },
  openGraph: {
    title: 'Influence — the right influencer, for the room',
    description,
    url: 'https://influencecreators.marketing/marketplace',
    images: [
      {
        url: '/skits/oia-fort-lauderdale.jpg',
        width: 720,
        height: 1280,
        alt: 'A table skit at Oia, a Greek restaurant in Fort Lauderdale',
      },
    ],
  },
};

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Influence venue marketplace',
  serviceType: 'Influencer marketing for venues',
  url: 'https://influencecreators.marketing/marketplace',
  provider: {
    '@type': 'Organization',
    name: 'Influence',
    url: 'https://influencecreators.marketing',
  },
  areaServed: 'South Florida',
  description,
};

export default function MarketplacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <MarketplaceHome />
    </>
  );
}
