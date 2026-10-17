import type { Metadata } from 'next';
import MarketplaceHome from './components/home/MarketplaceHome';

const title = 'Influence — The influencer marketplace for venues';
const description = 'Influence matches restaurants, nightclubs, hotels, resorts, and lounges with the right influencers for their niche. Proof from Deseray Marie’s venue skits at Prime Time, the DessertZ Food Truck, and Oia in Fort Lauderdale.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: 'https://influencecreators.marketing' },
  openGraph: {
    title,
    description,
    url: 'https://influencecreators.marketing',
    siteName: 'Influence',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Venue influencer matching',
  serviceType: 'Influencer marketing for venues',
  url: 'https://influencecreators.marketing',
  description,
  provider: {
    '@type': 'Organization',
    name: 'Influence',
    url: 'https://influencecreators.marketing',
    email: 'influencemodelsagency@gmail.com',
    telephone: '+1-561-552-0392',
    areaServed: ['Miami', 'Fort Lauderdale', 'Boca Raton', 'South Florida'],
  },
  areaServed: 'South Florida',
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketplaceHome />
    </>
  );
}
