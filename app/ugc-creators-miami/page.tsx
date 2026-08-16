import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, Video, TrendingUp, Users, Phone } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'UGC Creators Miami — UGC Content Creation Agency | Influence',
  description: 'Top UGC creators in Miami. Book verified influencers for authentic user-generated content, reels, TikToks, and brand videos. From $300.',
  openGraph: {
    title: 'UGC Creators Miami — UGC Content Creation Agency',
    description: 'Miami\'s top UGC creators. Authentic content, verified influencers, transparent pricing for brands.',
    url: 'https://influencemodels.agency/ugc-creators-miami',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ServiceAreaBusiness',
  name: 'Influence Models Agency - Miami UGC Creators',
  description: 'Miami UGC content creation agency. Book verified influencers for authentic user-generated content, reels, TikToks, and brand videos.',
  url: 'https://influencemodels.agency/ugc-creators-miami',
  telephone: '+15615520392',
  email: 'influencemodelsagency@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Serving Miami-Dade County',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.76168,
    longitude: -80.19178,
  },
  openingHours: 'Mo-Su 00:00-23:59',
  priceRange: '$300-$3,000',
  sameAs: [
    'https://www.instagram.com/influencemodels.agency',
    'https://www.tiktok.com/@influencemodelsagency',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does UGC content cost in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami UGC content starts at $300 per video. Package deals available for multiple videos. Pricing varies based on content type, complexity, and influencer tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with Miami-based UGC creators only?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with both Miami-based UGC creators and nationwide talent. For Miami-specific content, we prioritize local creators. Remote UGC is available from creators anywhere in the US.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can you deliver Miami UGC content?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer same-day response for Miami UGC bookings. Most UGC content is delivered within 3-7 days depending on complexity and revisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of UGC content do Miami creators make?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami UGC creators produce product demos, testimonials, lifestyle content, branded reels, trend participation, GRWM videos, and more. All content is optimized for Instagram Reels and TikTok.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://influencemodels.agency',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'UGC Creators Miami',
      item: 'https://influencemodels.agency/ugc-creators-miami',
    },
  ],
};

export default function MiamiUGCCreatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-[#080808]">
        {/* Nav */}
        <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
          <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
            <div className="flex items-center gap-4">
              <MobileNav />
              <div className="hidden md:flex items-center gap-10">
                <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Talent</Link>
                <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
                <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
              </div>
            </div>
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
            <div className="flex items-center gap-10">
              <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
              <Link href="/model-booking?service=ugc" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book UGC</Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-black/50 to-[#080808]" />
          <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Miami UGC Creators</p>
            <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
              Miami's Top<br />UGC Creators
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Verified Miami influencers creating authentic user-generated content for brands. Reels, TikToks, product demos, testimonials — all delivered remotely. From $300.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/model-booking?service=ugc" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
                Book Miami UGC Creators <ChevronRight className="h-4 w-4" />
              </Link>
              <a href="tel:+15615520392" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
                <Phone className="h-4 w-4" /> (561) 552-0392
              </a>
            </div>
          </div>
        </section>

        {/* What is UGC */}
        <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What is UGC</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Authentic content<br />that converts.
            </h2>
            <p className="text-white/45 text-base max-w-xl mb-14 leading-relaxed">
              User-generated content (UGC) is content created by real people, not polished brand ads. Miami UGC creators produce authentic, relatable videos that drive 4.5x more engagement than traditional advertising.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Video, stat: '4.5x', label: 'Higher Engagement', desc: 'UGC gets significantly more engagement than polished brand content.' },
                { icon: TrendingUp, stat: '60%', label: 'Lower Cost', desc: 'UGC campaigns cost 60% less than traditional ad production.' },
                { icon: Users, stat: '3x', label: 'Better Conversion', desc: 'UGC drives 3x higher conversion rates than traditional ads.' },
              ].map(({ icon: Icon, stat, label, desc }) => (
                <div key={label} className="border border-white/[0.06] p-7 text-center">
                  <Icon className="h-6 w-6 mx-auto mb-4" style={{ color: gold }} />
                  <p className="font-display font-bold italic text-3xl text-white mb-1">{stat}</p>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>{label}</p>
                  <p className="text-white/35 text-[13px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
          <div className="max-w-5xl">
            <p className="text-[10px] font-bold tracking-[0.4em} uppercase mb-6" style={{ color: gold }}>UGC Services</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              Miami UGC content<br />types we create.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'Product Demos', price: 'From $300', desc: 'Authentic product demonstrations and unboxing videos.' },
                { name: 'Testimonials', price: 'From $300', desc: 'Genuine customer testimonials and reviews on camera.' },
                { name: 'Lifestyle Content', price: 'From $300', desc: 'Lifestyle videos featuring your product in daily use.' },
                { name: 'Brand Reels', price: 'From $300', desc: 'Branded Instagram reels and TikTok content.' },
                { name: 'Trend Content', price: 'From $300', desc: 'Viral trend participation and challenge videos.' },
                { name: 'GRWM Content', price: 'From $300', desc: 'Get Ready With Me style content with products.' },
              ].map(({ name, price, desc }) => (
                <div key={name} className="border border-white/[0.06] p-6">
                  <h3 className="text-white font-bold text-sm mb-1">{name}</h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: gold }}>{price}</p>
                  <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Miami UGC */}
        <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em} uppercase mb-6" style={{ color: gold }}>Why Miami UGC</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Miami creators<br />for Miami brands.
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Local Market Understanding', desc: 'Our Miami UGC creators understand the local culture, trends, and what resonates with Miami audiences.' },
                { title: 'Bilingual Content', desc: 'Many of our Miami creators are bilingual, creating content in English and Spanish for broader reach.' },
                { title: 'Miami Aesthetic', desc: 'Authentic Miami vibe and aesthetic that connects with local and global audiences.' },
                { title: 'Verified Local Following', desc: 'Miami-based creators with authentic local followings, not fake accounts.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-5 p-6 border border-white/[0.04] bg-white/[0.01]">
                  <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                    <Check className="h-5 w-5" style={{ color: gold }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                    <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
          <div className="max-w-3xl">
            <p className="text-black/40 text-[10px] tracking-[0.5em} uppercase mb-8 font-semibold">Miami Brands</p>
            <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              Book Miami UGC<br />creators today.
            </h2>
            <p className="text-black/50 text-lg mb-10 max-w-lg">Authentic content from verified Miami influencers. From $300. 3-7 day delivery.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/model-booking?service=ugc" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
                Book Miami UGC <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#080808] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/20 text-xs">&copy; 2026 Influence</p>
              <Link href="https://www.instagram.com/influencemodels.agency" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
              <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
