import PersonaLanding from '../components/PersonaLanding';
import SimpleHeadcountBooking from '../components/SimpleHeadcountBooking';

export const metadata = {
  title: 'Hire Models for Music Video | Miami Music Video Girls — Influence Agency',
  description: 'Hire models for music video shoots in Miami. Cameo, Featured, Lead or Ensemble tiers. Same-week availability. Verified talent with major artist credits. From $199.',
  openGraph: {
    title: 'Hire Models for Music Video | Miami Music Video Girls',
    description: 'Hire verified models for music video shoots in Miami. Same-week availability. From $199.',
    url: 'https://influencecreators.marketing/music-video-booking',
  },
};

export default function MusicVideoBookingPage() {
  return (
    <PersonaLanding
      title="Book Music Video Talent in Miami"
      description="Cameo, Featured, Lead or Ensemble tiers for your music video. Same-week availability in Miami. Verified talent with major artist credits. From $199."
      tagline="Miami · Same-Week Availability"
      headline="Book Girls for\nYour Music Video."
      subheadline="Verified talent for your video — from solo features to full squads. No casting headaches. No flakey DMs. Just professional creators on set, on time."
      heroImage="/images/Shay/shay-1.jpg"
      heroImageAlt="Music video talent in Miami"
      primaryCta={{ text: 'Book Music Video Talent', href: '/start?service=musicvideo' }}
      secondaryCta={{ text: 'Browse Creators', href: '/marketplace' }}
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
          name: 'Cameo · 1 Hour',
          price: 199,
          tagline: '1 model · up to 1 hr',
          features: ['1 model', 'Up to 1 hour on set', 'Styled & camera-ready'],
          cta: 'Book Cameo 1 Hr',
          href: '/start?service=musicvideo&package=mv-cameo',
        },
        {
          name: 'Cameo · 2 Hours',
          price: 249,
          tagline: '1 model · up to 2 hrs',
          features: ['1 model', 'Up to 2 hours on set', 'Styled & camera-ready'],
          cta: 'Book Cameo 2 Hrs',
          href: '/start?service=musicvideo&package=mv-cameo-2',
        },
        {
          name: 'Featured',
          price: 450,
          tagline: '1 model · half day',
          features: ['1 model', 'Half day, up to 5 hours on set', 'Styled & camera-ready'],
          cta: 'Book Featured',
          href: '/start?service=musicvideo&package=mv-featured',
          popular: true,
        },
        {
          name: 'Lead',
          price: 950,
          tagline: '1 lead model · full day',
          features: ['1 lead model', 'Full day, up to 10 hours on set', 'Styled & camera-ready'],
          cta: 'Book Lead',
          href: '/start?service=musicvideo&package=mv-lead',
        },
        {
          name: 'Ensemble',
          price: 1950,
          tagline: '3+ models · full day',
          features: ['3+ models', 'Full day', 'Custom quote for larger casts'],
          cta: 'Book Ensemble',
          href: '/start?service=musicvideo&package=mv-ensemble',
        },
      ]}
      trustBadges={['Verified Creators', 'Same-Week Booking', 'No Flakes']}
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
      finalCta={{ text: 'Book Music Video Talent', href: '/start?service=musicvideo' }}
      bookingSection={<SimpleHeadcountBooking />}
      hidePackagePrices
    />
  );
}
