import PersonaLanding from '../components/PersonaLanding';

export const metadata = {
  title: 'Creators for Photoshoot | Hire Creators for Shoots Miami — Influence Marketplace',
  description: 'Hire creators for photoshoots, fashion editorials, lookbooks, and e-commerce in South Florida. Professional creators for brand shoots and creative projects. From $300.',
  openGraph: {
    title: 'Creators for Photoshoot | Hire Creators for Shoots Miami',
    description: 'Hire professional creators for photoshoots, editorials, and e-commerce in South Florida. From $300.',
    url: 'https://influencecreators.marketing/creators-for-shoots',
  },
};

export default function ModelsForShootsPage() {
  return (
    <PersonaLanding
      title="Book Models for Photo Shoots"
      description="Book professional models for brand shoots, fashion editorials, lookbooks, and e-commerce in South Florida. From $300."
      tagline="Photo and brand shoots in South Florida"
      headline="Models for Your\nNext Shoot."
      subheadline="Professional creators for brand campaigns, fashion editorials, lookbooks, and e-commerce shoots. Camera-ready, on time, and matched to your creative direction."
      heroImage="/images/AshleyM/ashleym-1.jpg"
      heroImageAlt="Model for photo shoot"
      primaryCta={{ text: 'Book a Creator', href: '/start?service=shoot' }}
      secondaryCta={{ text: 'Browse Creators', href: '/marketplace' }}
      painPoints={[
        'You have a shoot planned but can’t find reliable creators',
        'Agency rates are too high for your budget',
        'Models show up unprepared or don’t match the brief',
      ]}
      solutionTitle="Casted. Styled. Camera-Ready."
      solutionBody="We match you with professional creators who fit your brand, style, and creative vision. Every booking includes coordination, styling guidance, and on-set support."
      solutionFeatures={[
        'Solo, duo, or full-cast options',
        'Fashion, editorial, and e-commerce experience',
        '4-hour or full-day booking windows',
        'Camera-ready hair, makeup, and wardrobe',
        'In South Florida',
      ]}
      packages={[
        {
          name: '1 Model',
          price: 300,
          tagline: 'Solo Shoot',
          features: ['1 professional model · 4 hours', 'Camera-ready & styled', 'Multiple looks', 'South Florida location'],
          cta: 'Book 1 Model',
          href: '/start?service=shoot&package=solo',
        },
        {
          name: '2 Models',
          price: 550,
          tagline: 'Most Popular',
          features: ['2 professional creators · 4 hours', 'Coordinated looks', 'Multiple setups', 'South Florida location'],
          cta: 'Book 2 Models',
          href: '/start?service=shoot&package=duo',
          popular: true,
        },
        {
          name: '3 Models',
          price: 650,
          tagline: 'Trio Shoot',
          features: ['3 professional creators · 4 hours', 'Styled ensemble looks', 'Full-cast energy', 'South Florida location'],
          cta: 'Book 3 Models',
          href: '/start?service=shoot&package=trio',
        },
      ]}
      trustBadges={['Verified Models', 'Same-Week Booking', 'Camera-Ready']}
      socialProof={[
        { stat: '2,000+', label: 'Shoots Booked' },
        { stat: '48hr', label: 'Avg. Turnaround' },
        { stat: '100+', label: 'Brand Clients' },
        { stat: '4.9★', label: 'Client Rating' },
      ]}
      faq={[
        { q: 'Where can I hire creators for a photoshoot near me?', a: 'Influence Marketplace has verified creators for photoshoots in Miami, Fort Lauderdale, and Boca Raton. You can book online or browse our marketplace by look and style.' },
        { q: 'Can I choose the model look for my shoot?', a: 'Yes. You can browse the marketplace or send us a creative brief and we’ll match you with models who fit your vision.' },
        { q: 'Are models styled when they arrive for the shoot?', a: 'Yes. Creators arrive camera-ready with hair and makeup done. You can provide wardrobe direction in advance.' },
        { q: 'Do you book creators for e-commerce shoots?', a: 'Yes. We regularly book creators for e-commerce, product photography, and catalog shoots.' },
        { q: 'Can I book a creator for a full-day shoot?', a: 'Yes. Full-day bookings are available for 6–8 hour shoots and larger productions.' },
        { q: 'How much does it cost to hire a creator for a photoshoot?', a: 'Creators for shoots start at $300 for a 4-hour session. Duo, trio, and full-day options are available at higher rates.' },
      ]}
      finalCta={{ text: 'Book a Creator', href: '/start?service=shoot' }}
      hidePackagePrices
    />
  );
}
