import PersonaLanding from '../components/PersonaLanding';

export const metadata = {
  title: 'Bottle Girls Miami | Event Hostesses & Creators for Events — Influence Marketplace',
  description: 'Book bottle girls, event hostesses, and creators for events in Miami, Fort Lauderdale, and Boca Raton. Clubs, parties, brand activations, and VIP bottle service. From $400.',
  openGraph: {
    title: 'Bottle Girls Miami | Event Hostesses & Creators for Events',
    description: 'Book bottle girls and event hostesses in Miami. Verified creators for clubs, parties, and activations. From $400.',
    url: 'https://influencecreators.marketing/event-creators',
  },
};

export default function EventTalentPage() {
  return (
    <PersonaLanding
      title="Event Talent & VIP Hostesses"
      description="Book professional event talent, bottle girls, and VIP hostesses for clubs, parties, and brand activations in South Florida. From $400."
      tagline="South Florida · Same-Week Availability"
      headline="Elevate Your\nEvent."
      subheadline="Professional event creators, bottle girls, and hostesses for clubs, parties, grand openings, and brand activations in Miami, Fort Lauderdale, and Boca Raton."
      heroImage="/images/Des/des-21.jpg"
      heroImageAlt="Event creators in Miami"
      primaryCta={{ text: 'Book Event Creators', href: '/start?service=event' }}
      secondaryCta={{ text: 'View Packages', href: '/pricing' }}
      painPoints={[
        'Your venue needs energy but last-minute staffing is unreliable',
        'You’re throwing a party and need hostesses fast',
        'Promoters promise creators but don’t deliver',
      ]}
      solutionTitle="Verified Creators. Real Professionalism."
      solutionBody="We staff your event with verified, camera-ready creators who know how to engage a room. From VIP tables to brand activations, we handle the logistics."
      solutionFeatures={[
        '1 to 50+ creators per event',
        'Bottle girls, hostesses, and brand ambassadors',
        '4-hour standard shifts or custom timing',
        'Styled & event-ready on arrival',
        'Same-week availability in South Florida',
      ]}
      packages={[
        {
          name: '1 Girl',
          price: 400,
          tagline: 'Solo Hostess',
          features: ['1 professional hostess · 4 hours', 'VIP table or party presence', 'Event-ready styling', 'South Florida'],
          cta: 'Book 1 Girl',
          href: '/start?service=event&package=1-girl',
        },
        {
          name: '3 Girls',
          price: 1200,
          tagline: 'Most Popular',
          features: ['3 professional hostesses · 4 hours', 'VIP section coverage', 'Coordinated looks & energy', 'Dedicated on-site lead'],
          cta: 'Book 3 Girls',
          href: '/start?service=event&package=3-girls',
          popular: true,
        },
        {
          name: '5 Girls',
          price: 2000,
          tagline: 'Squad Takeover',
          features: ['5 professional hostesses · 4 hours', 'Full venue presence', 'Multiple VIP tables', 'On-site coordinator included'],
          cta: 'Book 5 Girls',
          href: '/start?service=event&package=5-girls',
        },
      ]}
      trustBadges={['Verified Creators', 'Same-Week Booking', 'Event-Ready']}
      socialProof={[
        { stat: '1,000+', label: 'Events Staffed' },
        { stat: '48hr', label: 'Avg. Turnaround' },
        { stat: '50+', label: 'Venue Partners' },
        { stat: '4.9★', label: 'Client Rating' },
      ]}
      faq={[
        { q: 'How fast can I book bottle girls in Miami?', a: 'We recommend 48–72 hours for best selection, but same-day bookings are sometimes available for established venues in Miami, Fort Lauderdale, and Boca Raton.' },
        { q: 'Where can I hire creators for events near me?', a: 'Influence Marketplace provides event hostesses, bottle girls, and promotional creators for events across South Florida. You can book online or call us directly.' },
        { q: 'What do event hostesses wear?', a: 'Creators arrive event-ready. You can provide dress code guidance when booking, and we coordinate styling to match your venue or brand.' },
        { q: 'Can I book monthly event creators for my venue?', a: 'Yes. We offer monthly venue packages with recurring creators, discounted rates, and dedicated coordination.' },
        { q: 'What if a bottle girl is late or doesn’t show?', a: 'We confirm all creators ahead of time and maintain backup hosts. If an issue occurs, we send a replacement quickly.' },
        { q: 'Do you provide models for corporate events and brand activations?', a: 'Yes. We book promotional creators and brand ambassadors for corporate events, product launches, trade shows, and brand activations.' },
      ]}
      finalCta={{ text: 'Book Event Creators', href: '/start?service=event' }}
      hidePackagePrices
    />
  );
}
