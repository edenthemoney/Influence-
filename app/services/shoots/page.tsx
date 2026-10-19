import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, Phone, Camera, Film, Users, Star, Clock, Palette } from 'lucide-react';
import MobileNav from '../../components/MobileNav';
import { hideCopy, verifiedPartners } from '@/data/partners';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Book Creators for Shoots & Music Videos — Influence Marketplace | South Florida',
  description: 'Professional creators for music videos, brand shoots, fashion editorials, and commercial productions in South Florida. .',
  openGraph: {
    title: 'Book Creators for Shoots & Music Videos — Influence Marketplace',
    description: 'Professional creators for your video or photo production. South Florida.',
    url: 'https://influencecreators.marketing/services/shoots',
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Models for Shoots & Music Videos",
  "description": "Professional creators for music videos, brand shoots, fashion editorials, and commercial productions in South Florida. From $300.",
  "provider": {
    "@type": "Organization",
    "name": "Influence",
    "url": "https://influencecreators.marketing"
  },
  "areaServed": [
    "Miami",
    "Fort Lauderdale",
    "Boca Raton",
    "Palm Beach",
    "West Palm Beach",
    "Delray Beach",
    "Hollywood",
    "Pompano Beach",
    "Hallandale Beach",
    "Aventura",
    "Sunny Isles Beach",
    "Miami Beach",
    "Coral Gables",
    "Key Biscayne",
    "Doral",
    "Weston"
  ],
  "offers": {
    "@type": "Offer",
    "price": "300",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export default function ShootsPage() {
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
            <Link href="/start?service=shoot" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Creators</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Genesis/genesis-1.jpg" alt="Shoots & Videos" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>In-Person · South Florida</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
            Models for Your<br />Next Shoot.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Music videos. Brand campaigns. Fashion editorials. Commercial content. Book professional creators for your production — we handle the casting, you focus on the creative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start?service=shoot" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Your Shoot <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              Browse Models
            </Link>
          </div>
        </div>
      </section>

      {verifiedPartners.length > 0 && (
      <section className="border-t border-white/[0.06] bg-[#060606] py-10 md:py-14 px-8 md:px-16">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {verifiedPartners.map((partner) => (
            <span key={partner.name} className="font-display font-light italic text-white text-lg md:text-2xl">{partner.name}</span>
          ))}
        </div>
      </section>
      )}

      {/* Packages */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Shoot Packages</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Pick your package.<br />We&apos;ll match the creator.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
          {[
            { name: 'Solo', desc: '1 model · 4 hours', popular: false },
            { name: 'Duo', desc: '2 models · 4 hours', popular: false },
            { name: 'Trio', desc: '3 creators · styled', popular: true },
            { name: 'Full Day', desc: '6–8 hours · multi-scene', popular: false },
          ].map(({ name, desc, popular }) => (
            <div key={name} className="border p-7 flex flex-col" style={{ borderColor: popular ? gold : 'rgba(255,255,255,0.06)', backgroundColor: popular ? 'rgba(201,169,110,0.03)' : 'transparent' }}>
              {popular && <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: gold }}>Most Popular</p>}
              <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
              <p className="text-white/35 text-sm mb-5">{desc}</p>
              <Link href="/start?service=shoot" className="mt-auto flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all hover:opacity-85" style={{ backgroundColor: popular ? gold : 'transparent', color: popular ? '#000' : 'rgba(255,255,255,0.5)', border: popular ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                Book <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs mt-6">All in-person bookings serve the South Florida / Greater Miami area. </p>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What We&apos;re Booked For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Every production type.<br />Every aesthetic.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { icon: Film, title: 'Music Videos', desc: 'Professional creators for your music visual. Hip-hop, R&B, Latin, pop — we match the vibe and aesthetic of your project.' },
            { icon: Camera, title: 'Brand & Fashion Shoots', desc: 'Product photography, lifestyle shoots, lookbook campaigns. Creators who know how to sell your brand on camera.' },
            { icon: Star, title: 'Commercial Content', desc: 'TV spots, social media ads, promotional material. Professional, reliable creators that shows up prepared and delivers.' },
            { icon: Palette, title: 'Creative & Editorial', desc: 'Artistic shoots, magazine editorials, concept pieces. Creators with range who can embody your creative vision.' },
            { icon: Users, title: 'Group Productions', desc: 'Need 3, 5, or 10+ creators? We handle casting and coordination for large-scale productions.' },
            { icon: Clock, title: 'Same-Week Booking', desc: 'Last-minute shoot? We can often get creators booked within 48 hours for urgent productions.' },
          ].filter(({ title, desc }) => !hideCopy(title) && !hideCopy(desc)).map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-5 p-6 border border-white/[0.04] bg-white/[0.01]">
              <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" style={{ color: gold }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Service Area</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          South Florida Production Coverage
        </h2>
        <p className="text-white/45 text-lg max-w-2xl mb-12 leading-relaxed">
          Our shoot and music video model services cover the entire South Florida region. From Miami studios to beach locations in Fort Lauderdale, Boca Raton, and Palm Beach, we provide professional creators for any production.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {[
            'Miami', 'Fort Lauderdale', 'Boca Raton', 'Palm Beach',
            'West Palm Beach', 'Delray Beach', 'Hollywood', 'Pompano Beach',
            'Hallandale Beach', 'Aventura', 'Sunny Isles Beach', 'Miami Beach',
            'Coral Gables', 'Key Biscayne', 'Doral', 'Weston'
          ].map(city => (
            <div key={city} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
              <span className="text-white/55 text-[13px]">{city}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Ready to Shoot?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Your production.<br />Our creators.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Professional creators matched to your project. From solo shoots to full productions. South Florida.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start?service=shoot" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Your Shoot <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-6 text-black/40 text-xs self-center">
              <span></span>
              <span>✓ Celebrity-level creators</span>
              <span>✓ Stripe checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Related Services</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Complete your<br />marketing stack.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/services/content" className="group border border-white/[0.06] p-8 hover:border-white/[0.15] transition-all duration-300">
              <h3 className="text-white font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Social Media Content</h3>
              <p className="text-white/35 text-sm leading-relaxed">UGC content creation including reaction videos, promo reels, and viral challenges for artists and brands.</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-4" style={{ color: gold }}>Learn More →</p>
            </Link>
            <Link href="/services/business" className="group border border-white/[0.06] p-8 hover:border-white/[0.15] transition-all duration-300">
              <h3 className="text-white font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Business Content & Brand Ambassadors</h3>
              <p className="text-white/35 text-sm leading-relaxed">Creators visit your business to create authentic on-location content for restaurants, salons, retail stores, and more.</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-4" style={{ color: gold }}>Learn More →</p>
            </Link>
            <Link href="/services/events" className="group border border-white/[0.06] p-8 hover:border-white/[0.15] transition-all duration-300">
              <h3 className="text-white font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Event Creators & Hosting</h3>
              <p className="text-white/35 text-sm leading-relaxed">Professional creators for events, parties, activations, and brand experiences in South Florida.</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-4" style={{ color: gold }}>Learn More →</p>
            </Link>
            <Link href="/services/commercials" className="group border border-white/[0.06] p-8 hover:border-white/[0.15] transition-all duration-300">
              <h3 className="text-white font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Commercials & Speaking Roles</h3>
              <p className="text-white/35 text-sm leading-relaxed">Professional creators for TV commercials, speaking roles, and brand campaigns.</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-4" style={{ color: gold }}>Learn More →</p>
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
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Creators</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
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
