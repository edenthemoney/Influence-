'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const gold = '#c9a96e';

const faqs = [
  {
    question: 'What is Influence?',
    answer: 'Influence is a South Florida creator marketing marketplace based in Miami. We connect artists, brands, record labels, and local businesses with verified influencers and creators for UGC content, music videos, event hosting, commercial shoots, and brand campaigns.',
  },
  {
    question: 'How do I book a creator or influencer in Miami?',
    answer: 'Book on the site. Choose the service, tell us the date and the job, and we reply with availability and a price for venues, brands, and creators.',
  },
  {
    question: 'What services do you offer for music artists?',
    answer: 'We provide music video creators, TikTok and Instagram music promotion, song reaction videos, viral challenge creators, album release livestreams, and influencer campaigns designed to increase streams and visibility for independent and signed artists.',
  },
  {
    question: 'Do you offer UGC content creation for businesses?',
    answer: 'Yes. We send professional creators and creators to your business location — restaurants, salons, gyms, retail stores, and more — to shoot reels, stories, and promotional content that you can use across your own social channels and ads.',
  },
  {
    question: 'How much does it cost to hire an influencer?',
    answer: 'Our campaigns start at $300. Pricing depends on the creator, deliverables, usage rights, and campaign scope. Visit our pricing page for package details or request a custom quote through the booking form.',
  },
  {
    question: 'Can I hire influencers outside of Miami?',
    answer: 'Yes. While our in-person shoots are focused on South Florida, our remote UGC and social media content services are available nationwide. Creators create content from their location and delivers it digitally.',
  },
  {
    question: 'What makes Influence different from other creator marketplaces?',
    answer: 'We are a minority and women-owned marketplace in South Florida. We match venues and brands with Brand Ambassadors and influencers for events, campaigns, and content.',
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-[#060606] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-center mb-5" style={{ color: gold }}>Questions & Answers</p>
        <h2 className="font-display font-bold italic text-white text-center leading-[0.9] mb-12 md:mb-16" style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/[0.06] bg-[#080808] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="text-white text-[15px] md:text-[17px] font-medium pr-6">{faq.question}</span>
                <ChevronDown className={`shrink-0 w-5 h-5 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} style={{ color: gold }} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-white/55 text-sm md:text-[15px] leading-relaxed px-5 md:px-6 pb-5 md:pb-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
