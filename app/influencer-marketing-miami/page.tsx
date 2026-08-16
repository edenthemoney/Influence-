import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, MapPin, TrendingUp, Users, Star, Phone } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Miami — Story Reposts, Collab Posts, UGC & Models | Influence',
  description: 'Miami\'s top influencer marketing agency. Book celebrity-connected creators for story reposts, collab posts, UGC content, music promotion, brand campaigns, and events. From $300.',
  openGraph: {
    title: 'Influencer Marketing Agency Miami — Story Reposts, Collab Posts & UGC',
    description: 'Miami\'s premier influencer marketing agency. Celebrity-connected talent, story reposts, collab posts, UGC, transparent pricing, proven results for brands and artists.',
    url: 'https://influencemodels.agency/influencer-marketing-miami',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/influencer-marketing-miami',
    languages: {
      'en': 'https://influencemodels.agency/influencer-marketing-miami',
      'es': 'https://influencemodels.agency/influencer-marketing-miami-es',
    },
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ServiceAreaBusiness',
  name: 'Influence Models Agency - Miami',
  description: 'Miami\'s premier influencer marketing agency. Book celebrity-connected influencers for story reposts, collab posts, UGC content, music promotion, brand campaigns, and model bookings.',
  url: 'https://influencemodels.agency/influencer-marketing-miami',
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
  areaServed: [
    { '@type': 'City', name: 'Miami' },
    { '@type': 'City', name: 'Miami Beach' },
    { '@type': 'City', name: 'Coral Gables' },
    { '@type': 'City', name: 'Key Biscayne' },
    { '@type': 'City', name: 'Aventura' },
    { '@type': 'City', name: 'Sunny Isles Beach' },
    { '@type': 'City', name: 'Hallandale Beach' },
  ],
  serviceType: [
    'Story Reposts',
    'Collab Posts',
    'UGC Content Creation',
    'Influencer Marketing',
    'Model Booking',
    'Event Hosting',
    'Music Video Production',
  ],
  sameAs: [
    'https://instagram.com/influencemodels.agency',
    'https://twitter.com/influencemodels.agency',
    'https://facebook.com/influencemodels.agency',
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
      name: 'How much does influencer marketing cost in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami influencer marketing starts at $300 for UGC content. Event models start at $400/girl. Music video models start at $500. Pricing varies based on the influencer\'s following, content type, and campaign scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with Miami-based influencers only?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with both Miami-based influencers and nationwide talent. For on-site bookings in Miami, we prioritize local influencers. For remote UGC content, we can work with influencers anywhere in the US.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can you book Miami influencers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer same-day response for Miami bookings. Most campaigns can be booked and scheduled within 24-48 hours. Remote UGC content is typically delivered within 3-7 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas of Miami do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve all of Miami-Dade County including Miami, Miami Beach, Coral Gables, Key Biscayne, Aventura, Sunny Isles Beach, Hallandale Beach, and surrounding areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can influencers create content at my Miami business location?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our Business Content service sends influencers to your Miami business location to create reels, stories, and promotional content on-site. This is perfect for restaurants, salons, gyms, and retail stores.',
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
      name: 'Miami Influencer Marketing',
      item: 'https://influencemodels.agency/influencer-marketing-miami',
    },
  ],
};

export default function MiamiPage() {
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
              <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-black/50 to-[#080808]" />
          <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Miami Influencer Marketing</p>
            <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
              Miami's Top<br />Influencer Agency
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Verified models and influencers for UGC content, music promotion, brand campaigns, and events. Serving Miami, Miami Beach, Coral Gables, and all of South Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/model-booking" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
                Book Miami Influencers <ChevronRight className="h-4 w-4" />
              </Link>
              <a href="tel:+15615520392" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
                <Phone className="h-4 w-4" /> (561) 552-0392
              </a>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Service Area</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Serving Greater Miami
            </h2>
            <p className="text-white/45 text-base max-w-xl mb-14 leading-relaxed">
              We provide influencer marketing services across Miami-Dade County. Our models and influencers are available for on-site bookings throughout the Miami metro area.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {[
                'Miami', 'Miami Beach', 'Coral Gables', 'Key Biscayne',
                'Aventura', 'Sunny Isles Beach', 'Hallandale Beach', 'Doral',
                'Hialeah', 'Miami Gardens', 'North Miami', 'South Miami',
                'Coconut Grove', 'Brickell', 'Wynwood', 'Design District'
              ].map(city => (
                <div key={city} className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
                  <span className="text-white/55 text-[13px]">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
          <div className="max-w-5xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Miami Services</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              Influencer marketing<br />solutions for Miami brands.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'UGC Content Creation', price: 'From $300', desc: 'Remote content creation for Miami brands nationwide.' },
                { name: 'Music Promotion', price: 'From $300', desc: 'Song reaction videos for Miami artists and labels.' },
                { name: 'Business Content', price: 'From $300', desc: 'On-site content for Miami restaurants and businesses.' },
                { name: 'Event Models', price: 'From $400/girl', desc: 'Professional models for Miami events and parties.' },
                { name: 'Music Video Models', price: 'From $500', desc: 'Talent for Miami music video productions.' },
                { name: 'Commercial Production', price: 'From $599', desc: 'Scripted commercials and speaking roles.' },
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

        {/* Why Miami Brands Choose Us */}
        <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Why Miami</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Built for the Miami market.
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Local Expertise', desc: 'We know Miami. From South Beach to Wynwood, we understand the local culture, venues, and what resonates with Miami audiences.' },
                { title: 'Verified Miami Talent', desc: 'Our roster includes models and influencers based in Miami with authentic local followings. No fake accounts, no out-of-market pretending.' },
                { title: 'Fast Response Time', desc: 'Same-day response for Miami bookings. Our team is local and ready to mobilize for events, shoots, and campaigns.' },
                { title: 'Miami Network', desc: 'Relationships with Miami venues, clubs, restaurants, and event spaces. We can coordinate on-site content creation anywhere in Miami.' },
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

        {/* Other Locations */}
        <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>South Florida</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              Also serving nearby cities.
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { city: 'Fort Lauderdale', link: '/influencer-marketing-fort-lauderdale' },
                { city: 'Boca Raton', link: '/influencer-marketing-boca-raton' },
                { city: 'Palm Beach', link: '/influencer-marketing-palm-beach' },
                { city: 'West Palm Beach', link: '/influencer-marketing-west-palm-beach' },
                { city: 'Delray Beach', link: '/influencer-marketing-delray-beach' },
                { city: 'Hollywood', link: '/influencer-marketing-hollywood' },
              ].map(({ city, link }) => (
                <Link key={city} href={link} className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group">
                  <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">{city}</h3>
                  <p className="text-white/40 text-[13px] mt-2">Influencer marketing services</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
          <div className="max-w-3xl">
            <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Miami Brands</p>
            <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              Ready to grow<br />in Miami?
            </h2>
            <p className="text-black/50 text-lg mb-10 max-w-lg">Book Miami influencers for your next campaign. From $300. Same-day response.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/model-booking" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
                Book Miami Influencers <ChevronRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-6 text-black/40 text-xs self-center">
                <span>✓ Miami-based</span>
                <span>✓ Verified talent</span>
                <span>✓ Fast delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#080808] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
            <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
              <div>
                <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '17px', color: gold }}>Influence</Link>
                <p className="text-white/40 text-sm mt-4 mb-2">Influence Models Agency</p>
                <p className="text-white/30 text-xs">Miami, FL 33101</p>
                <p className="text-white/30 text-xs">(561) 552-0392</p>
                <p className="text-white/30 text-xs">influencemodelsagency@gmail.com</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
                <div>
                  <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                  <ul className="space-y-3">
                    <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Talent</Link></li>
                    <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                    <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                    <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                  <ul className="space-y-3">
                    <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                    <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                    <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                    <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                    <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                  <ul className="space-y-3">
                    <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                    <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                    <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                    <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Roster</Link></li>
                    <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>
                  </ul>
                </div>
              </div>
            </div>
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
