import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Influence Influencer Marketing Agency | Pricing, Services & How It Works',
  description: 'Frequently asked questions about Influence, a South Florida influencer marketing agency. Learn about pricing, how to book influencers, music promotion, UGC content, event hosting, and more.',
  openGraph: {
    title: 'FAQ — Influence Influencer Marketing Agency',
    description: 'Answers to common questions about booking influencers, music promotion, UGC content creation, event hosting, pricing, and campaign management.',
    url: 'https://influencemodels.agency/faq',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/faq',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does Influence Models Agency work?', acceptedAnswer: { '@type': 'Answer', text: 'Browse our marketplace of verified models and influencers, select who fits your brand, choose a service and package, then book online. We handle talent coordination and deliver your content. No account required.' } },
    { '@type': 'Question', name: 'How much does it cost to book a model or influencer?', acceptedAnswer: { '@type': 'Answer', text: 'Pricing starts at $300 for a single model booking. Packages range from $300 for a solo UGC reel or music reaction video up to $6,000+ for large-scale campaigns with multiple models. All pricing is transparent with no hidden fees.' } },
    { '@type': 'Question', name: 'What services does Influence Models Agency offer?', acceptedAnswer: { '@type': 'Answer', text: 'We offer: UGC & branded reels (from $300), music video models (from $500), music reaction videos (from $300), business content creation (from $300), photo and video shoots (from $300), event models and hosting (from $400/girl), bottle girls and VIP hostesses (from $400/girl), and commercial productions (from $599). All services are available in South Florida / Miami.' } },
    { '@type': 'Question', name: 'How fast is content delivered?', acceptedAnswer: { '@type': 'Answer', text: 'Remote content like UGC reels and music reactions is delivered in 3–7 business days. In-person bookings (shoots, events, music videos) are scheduled within the same week. Rush delivery is available.' } },
    { '@type': 'Question', name: 'Can I request a specific model?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can browse our marketplace at influencemodels.agency/marketplace, select your preferred talent, and book them directly. You can also specify preferences in the booking notes.' } },
    { '@type': 'Question', name: 'Where is Influence Models Agency located?', acceptedAnswer: { '@type': 'Answer', text: 'We are based in South Florida and serve Miami, Boca Raton, Fort Lauderdale, and the surrounding area for in-person bookings. Remote services like UGC content and music reactions are available nationwide and internationally.' } },
    { '@type': 'Question', name: 'How do I promote my music using Influence Models Agency?', acceptedAnswer: { '@type': 'Answer', text: 'Choose the Music Reactions or Music Video Models service on our booking page. Provide your song link and any creative direction. Our models create authentic reaction videos or appear in your music video to drive streams and social engagement.' } },
    { '@type': 'Question', name: 'Is there a contract or long-term commitment?', acceptedAnswer: { '@type': 'Answer', text: 'No long-term commitment required. One-time bookings are project-based. Monthly subscription plans for ongoing UGC or music promotion can be cancelled anytime.' } },
    { '@type': 'Question', name: 'What celebrities have your models worked with?', acceptedAnswer: { '@type': 'Answer', text: 'Our talent has credits with Sean Paul, Bryson Tiller, DaBaby, Trippie Redd, Kodak Black, Akon, Young Thug, Vybz Kartel, Kai Cenat, French Montana, and others. Our models have appeared on Love & Hip Hop, VH1, Forbes, and Fenty Beauty campaigns.' } },
    { '@type': 'Question', name: 'How do I book a model for my business?', acceptedAnswer: { '@type': 'Answer', text: 'Visit influencemodels.agency/model-booking, select "Business Content Creation", choose your package, enter your business location and details, and complete checkout via Stripe. A model will be assigned and visit your location to create content.' } },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
