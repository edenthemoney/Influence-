import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import MobileNav from '../components/MobileNav';
import { serviceLineup } from '@/data/service-lineup';

const gold = '#c9a96e';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Creator Marketing Services",
  description: "Book verified influencers for UGC content, music promotion, brand campaigns, event hosting, and content orderings in South Florida.",
  provider: {
    "@type": "Organization",
    name: "Influence",
    url: "https://influencecreators.marketing",
  },
  areaServed: [
    { "@type": "City", name: "Miami" },
    { "@type": "City", name: "Fort Lauderdale" },
    { "@type": "City", name: "Boca Raton" },
    { "@type": "City", name: "Palm Beach" },
    { "@type": "City", name: "West Palm Beach" },
    { "@type": "City", name: "Delray Beach" },
    { "@type": "City", name: "Hollywood" },
    { "@type": "City", name: "Pompano Beach" },
    { "@type": "City", name: "Hallandale Beach" },
    { "@type": "City", name: "Aventura" },
    { "@type": "City", name: "Sunny Isles Beach" },
    { "@type": "City", name: "Miami Beach" },
    { "@type": "City", name: "Coral Gables" },
    { "@type": "City", name: "Key Biscayne" },
    { "@type": "State", name: "Florida" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creator Marketing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UGC Content Creation", description: "User-generated content videos, Instagram reels, TikToks, and brand promotional content created by verified influencers." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Music Promotion", description: "Song reaction videos, album livestreams, and music content promotion across TikTok and Instagram by influencers." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Hosting & Content Ordering", description: "Book professional creators for event hosting, party promotions, club appearances, and brand activations in South Florida." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Content Creation", description: "Professional creators visit your business location to create reels, stories, and promotional content on-site." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Production", description: "Professional creators and actresses for scripted commercial productions, national campaigns, and broadcast-quality content." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Story Reposts", description: "Creators post your content to their Instagram Stories with swipe-up links for 24-hour visibility and conversions." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Collab Posts", description: "Creators co-author posts with your brand that appear on both feeds for dual audience reach and shared engagement." } },
    ],
  },
};

export const metadata: Metadata = {
  title: 'Services — Influence Marketplace | Creators, Content, Commercials & Events',
  description: 'Book professional creators for social media content, music reactions, business promos, video shoots, TV commercials, and events across South Florida.',
  openGraph: {
    title: 'Services — Influence Marketplace',
    description: 'Social media content, music reactions, business visits, shoots, commercials, and events.',
    url: 'https://influencecreators.marketing/services',
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Creators</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Our Services</p>
        <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
          What we book.
        </h1>
        <p className="text-white text-[16px] md:text-[18px] max-w-xl">
          Talent, content, music, venues, and events. Every service we still book is listed here.
        </p>
      </section>

      {serviceLineup.map((group) => (
        <section key={group.id} id={group.id} className="border-t border-white/[0.06] px-5 py-14 md:px-16 md:py-20">
          <h2 className="font-display font-bold italic text-white leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>{group.label}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((service) => (
              <Link key={service.title} href={service.href} className="flex flex-col border border-white/10 p-6 hover:border-[#c9a96e]/50">
                <h3 className="font-display text-[26px] font-semibold leading-tight text-white">{service.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/85">{service.line}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: gold }}>
                  Book <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Not Sure Which Service?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Tell us your goal.<br />We&apos;ll recommend the rest.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Our booking flow asks who you are and matches you to the perfect service. No calls needed — checkout in under 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Find Your Service <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/quote" className="inline-flex items-center justify-center gap-3 px-10 py-6 text-[14px] font-bold tracking-widest uppercase border border-black/15 text-black/60 hover:text-black hover:border-black/30 transition-all">
              Talk to a Rep
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: gold }}>Influence</Link>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                <ul className="space-y-3">
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Creators</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                  <li><Link href="/start" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Brand Ambassadors</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Creators</Link></li>
                  <li><Link href="/start?service=storyreposts" className="text-white/40 hover:text-white transition-colors text-sm">Story Reposts</Link></li>
                  <li><Link href="/start?service=collabreposts" className="text-white/40 hover:text-white transition-colors text-sm">Collab Posts</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/quote" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Network</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">&copy; 2026 Influence</p>
            <Link href="https://www.instagram.com/influencecreators.marketing" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
            <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
