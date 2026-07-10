import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, MapPin, Phone, Star, Users, Clock, Shield } from 'lucide-react';
import MobileNav from '../../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Event Models & Hosting — Influence Agency | South Florida',
  description: 'Book beautiful professional models for your event, club night, brand activation, or party in South Florida. Same-week booking available.',
  openGraph: {
    title: 'Event Models & Hosting — Influence Agency',
    description: 'Professional event models for clubs, parties, brand activations & more. South Florida.',
    url: 'https://influencemodels.agency/services/events',
  },
};

export default function EventsPage() {
  return (
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
            <Link href="/model-booking?service=event" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Event Models</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Des/des-5.jpg" alt="Event Models" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>In-Person · South Florida</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
            Beautiful Models<br />At Your Event.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Professional models show up to your club night, brand activation, party, or launch event — on time, dressed to impress, and ready to elevate your entire vibe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=event" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Event Models <ChevronRight className="h-4 w-4" />
            </Link>
            <a href="tel:+15615520392" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              <Phone className="h-4 w-4" /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Event Sizes */}
      <section className="border-t border-white/[0.06] bg-[#060606]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.06]">
          {[
            { girls: '1–2', label: 'Small Event' },
            { girls: '3–5', label: 'Mid-Size' },
            { girls: '8–10', label: 'Large Event' },
            { girls: '15+', label: 'Best Rate' },
          ].map(({ girls, label }) => (
            <div key={girls} className="text-center py-8 md:py-12">
              <p className="text-white/30 text-[10px] tracking-widest uppercase mb-2">{label}</p>
              <p className="font-display font-bold italic text-2xl md:text-3xl text-white mb-1">{girls} Girls</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>How It Works</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-16" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
          Three steps. That&apos;s it.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          {[
            { num: '01', title: 'Tell Us About Your Event', desc: 'Date, venue, vibe, how many girls you need. We handle the rest — matching, scheduling, and coordinating.' },
            { num: '02', title: 'Models Show Up Ready', desc: 'Professional, on-time, dressed to match your event. They know how to work a room, create content, and attract attention.' },
            { num: '03', title: 'Your Event Stands Out', desc: 'More energy, more photos, more buzz. Our models generate organic content and social proof that extends beyond the night.' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="border border-white/[0.06] p-8">
              <p className="font-display font-bold italic text-4xl mb-4" style={{ color: gold }}>{num}</p>
              <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What&apos;s Included</p>
          <h2 className="font-display font-light italic text-white mb-12" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            More than just a pretty face.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Users, title: 'Hand-Picked Models', desc: 'We match models to your event type, dress code, and audience. Club night? Brand launch? Private party? We have the right girls.' },
              { icon: Clock, title: '3–4 Hour Standard Block', desc: 'Models arrive on-time for a 3–4 hour appearance. Need more time? Extended and full-night add-ons available.' },
              { icon: Star, title: 'Social Media Content', desc: 'Models post stories, reels, and content from your event — giving you organic social proof and reach to their followers.' },
              { icon: Shield, title: 'Professional & Reliable', desc: 'Vetted, experienced, and professional. Our models show up ready to work, not party. Your event is their priority.' },
              { icon: MapPin, title: 'All of South Florida', desc: 'Miami, Fort Lauderdale, Boca Raton, Palm Beach, and everywhere in between. We cover the entire South Florida region.' },
              { icon: Phone, title: 'Dedicated Coordinator', desc: 'For groups of 5+, you get a dedicated coordinator who handles arrivals, communication, and any on-site needs.' },
            ].map(({ icon: Icon, title, desc }) => (
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
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Perfect For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Every event hits different<br />with the right energy.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
          {[
            { title: 'Club Nights & Parties', items: ['VIP section presence', 'Bottle service hosting', 'Dance floor energy', 'Social media content'] },
            { title: 'Brand Activations', items: ['Product sampling', 'Brand ambassador roles', 'Photo-ready at all times', 'Customer engagement'] },
            { title: 'Private Events', items: ['Birthday parties', 'Corporate gatherings', 'Yacht events', 'Exclusive dinners'] },
            { title: 'Grand Openings', items: ['Restaurant launches', 'Store openings', 'Pop-up events', 'Red carpet hosting'] },
          ].map(({ title, items }) => (
            <div key={title} className="border border-white/[0.06] p-7">
              <h3 className="text-white font-bold text-base mb-5">{title}</h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
                    <span className="text-white/45 text-[13px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Service Area</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          South Florida Event Coverage
        </h2>
        <p className="text-white/45 text-lg max-w-2xl mb-12 leading-relaxed">
          Our event models and hosting services cover the entire South Florida region. From Miami nightlife to Palm Beach galas, Fort Lauderdale events to Boca Raton parties, we provide professional models for any occasion.
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
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Ready to Book?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Make your next event unforgettable.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Flat rate per girl. More girls = better rate. Same-week booking available for most events.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=event" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Event Models <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-6 text-black/40 text-xs self-center">
              <span>✓ South Florida</span>
              <span>✓ Same-week booking</span>
              <span>✓ Stripe checkout</span>
            </div>
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
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                </ul>
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
  );
}
