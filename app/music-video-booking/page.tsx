import PersonaLanding from '../components/PersonaLanding';
import SimpleHeadcountBooking from '../components/SimpleHeadcountBooking';

export const metadata = {
  title: 'Hire Models for Music Video | Miami Music Video Girls — Influence Agency',
  description: 'Hire models for music video shoots in Miami. Book 1 girl, 2 girls, or 3 girls for your video. Same-week availability. Verified talent with major artist credits. From $500.',
  openGraph: {
    title: 'Hire Models for Music Video | Miami Music Video Girls',
    description: 'Hire verified models for music video shoots in Miami. Same-week availability. From $500.',
    url: 'https://influencemodels.agency/music-video-booking',
  },
};

export default function MusicVideoBookingPage() {
  return (
    <PersonaLanding
      title="Book Music Video Talent in Miami"
      description="Book 1 girl, 2 girls, or 3 girls for your music video. Same-week availability in Miami. Verified talent with major artist credits. From $500."
      tagline="Miami · Same-Week Availability"
      headline="Book Girls for\nYour Music Video."
      subheadline="Verified talent for your video — from solo features to full squads. No casting headaches. No flakey DMs. Just professional creators on set, on time."
      heroImage="/images/Shay/shay-1.jpg"
      heroImageAlt="Music video talent in Miami"
      primaryCta={{ text: 'Book Music Video Talent', href: '/model-booking?service=musicvideo' }}
      secondaryCta={{ text: 'Browse Talent', href: '/marketplace' }}
      painPoints={[
        'You have a song ready but no one to cast for the video',
        'Instagram DMs are unreliable — girls don’t show up',
        'You need a specific look or vibe but don’t know where to start',
      ]}
      solutionTitle="Verified Talent. On Set. On Time."
      solutionBody="We handle the casting, coordination, and on-set logistics so you can focus on the video. Every creator in our network is vetted, professional, and camera-ready."
      solutionFeatures={[
        'Solo, duo, trio, or full squad options',
        'Verified talent with major artist credits',
        '4-hour or full-day booking windows',
        'Styled & camera-ready on arrival',
        'Same-week availability in South Florida',
      ]}
      packages={[
        {
          name: '1 Girl',
          price: 500,
          tagline: 'Solo Feature',
          features: ['1 featured model · 4 hours', 'Multiple scenes & looks', 'South Florida location', 'Styled & camera-ready'],
          cta: 'Book 1 Girl',
          href: '/model-booking?service=musicvideo&package=mv-solo',
        },
        {
          name: '2 Girls',
          price: 900,
          tagline: 'Duo Feature',
          features: ['2 coordinated models · 4 hours', 'Multiple scenes together', 'Styled ensemble looks', 'On-set coordinator'],
          cta: 'Book 2 Girls',
          href: '/model-booking?service=musicvideo&package=mv-duo',
          popular: true,
        },
        {
          name: '3 Girls',
          price: 1200,
          tagline: 'Trio Feature',
          features: ['3 full-feature models · 4 hours', 'Full video cast energy', 'Multiple scenes & interactions', 'Dedicated model coordinator'],
          cta: 'Book 3 Girls',
          href: '/model-booking?service=musicvideo&package=mv-trio',
        },
      ]}
      trustBadges={['Verified Talent', 'Same-Week Booking', 'No Flakes']}
      socialProof={[
        { stat: '40M+', label: 'Music Video Views' },
        { stat: '500+', label: 'Videos Cast' },
        { stat: '50+', label: 'Major Artists' },
        { stat: '24hr', label: 'Average Booking' },
      ]}
      faq={[
        { q: 'How fast can I book music video talent?', a: 'Most bookings are confirmed within 24–48 hours. Same-week shoots are available throughout South Florida, including Miami, Fort Lauderdale, and Boca Raton.' },
        { q: 'Do the girls come styled for the music video?', a: 'Yes. Every creator arrives camera-ready with hair, makeup, and wardrobe matched to your creative direction.' },
        { q: 'Can I hire models for a music video outside Miami?', a: 'Our in-person music video models are based in South Florida. Travel can be arranged for larger productions and label campaigns.' },
        { q: 'How do I market my music with a music video?', a: 'A professional music video is the fastest way to market your music on Instagram, TikTok, and YouTube. Pair your video with creator reactions and UGC content to maximize reach.' },
        { q: 'What if someone cancels on my music video shoot?', a: 'We maintain backup talent for every shoot. If a confirmed creator can’t make it, we provide a replacement so your video stays on schedule.' },
        { q: 'Where can I find music video models near me?', a: 'Influence Agency has verified music video models in Miami and South Florida. You can book directly online or browse our marketplace.' },
      ]}
      finalCta={{ text: 'Book Music Video Talent', href: '/model-booking?service=musicvideo' }}
      bookingSection={<SimpleHeadcountBooking />}
      hidePackagePrices
    />
  );
}
