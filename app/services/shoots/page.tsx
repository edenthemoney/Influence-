import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, Phone, Camera, Film, Users, Star, Clock, Palette } from 'lucide-react';
import MobileNav from '../../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Book Models for Shoots & Music Videos — Influence Agency | South Florida',
  description: 'Professional models for music videos, brand shoots, fashion editorials, and commercial productions in South Florida. From $300. Same-week booking available.',
  openGraph: {
    title: 'Book Models for Shoots & Music Videos — Influence Agency',
    description: 'Professional models for your video or photo production. South Florida. From $300.',
    url: 'https://influencemodels.agency/services/shoots',
  },
};

export default function ShootsPage() {
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
            <Link href="/model-booking?service=shoot" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Models</Link>
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
            Music videos. Brand campaigns. Fashion editorials. Commercial content. Book professional models for your production — we handle the casting, you focus on the creative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=shoot" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Your Shoot <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              Browse Models
            </Link>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-10 md:py-14 px-8 md:px-16">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {['Sean Paul', 'Bryson Tiller', 'DaBaby', 'Kai Cenat', 'Forbes', 'Fenty Beauty', 'Miami Swim Week'].map(name => (
            <span key={name} className="font-display font-light italic text-white/25 text-lg md:text-2xl">{name}</span>
          ))}
        </div>
        <p className="text-center text-white/15 text-[10px] tracking-widest uppercase mt-4">Our models have worked alongside</p>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Shoot Packages</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Pick your package.<br />We&apos;ll match the talent.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
          {[
            { name: 'Solo', desc: '1 model · 4 hours', popular: false },
            { name: 'Duo', desc: '2 models · 4 hours', popular: false },
            { name: 'Trio', desc: '3 models · styled', popular: true },
            { name: 'Full Day', desc: '6–8 hours · multi-scene', popular: false },
          ].map(({ name, desc, popular }) => (
            <div key={name} className="border p-7 flex flex-col" style={{ borderColor: popular ? gold : 'rgba(255,255,255,0.06)', backgroundColor: popular ? 'rgba(201,169,110,0.03)' : 'transparent' }}>
              {popular && <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: gold }}>Most Popular</p>}
              <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
              <p className="text-white/35 text-sm mb-5">{desc}</p>
              <Link href="/model-booking?service=shoot" className="mt-auto flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all hover:opacity-85" style={{ backgroundColor: popular ? gold : 'transparent', color: popular ? '#000' : 'rgba(255,255,255,0.5)', border: popular ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                Book <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs mt-6">All in-person bookings serve the South Florida / Greater Miami area. Same-week availability.</p>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What We&apos;re Booked For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Every production type.<br />Every aesthetic.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { icon: Film, title: 'Music Videos', desc: 'Professional models for your music visual. Hip-hop, R&B, Latin, pop — we match the vibe and aesthetic of your project.' },
            { icon: Camera, title: 'Brand & Fashion Shoots', desc: 'Product photography, lifestyle shoots, lookbook campaigns. Models who know how to sell your brand on camera.' },
            { icon: Star, title: 'Commercial Content', desc: 'TV spots, social media ads, promotional material. Professional, reliable talent that shows up prepared and delivers.' },
            { icon: Palette, title: 'Creative & Editorial', desc: 'Artistic shoots, magazine editorials, concept pieces. Models with range who can embody your creative vision.' },
            { icon: Users, title: 'Group Productions', desc: 'Need 3, 5, or 10+ models? We handle casting and coordination for large-scale productions.' },
            { icon: Clock, title: 'Same-Week Booking', desc: 'Last-minute shoot? We can often get models booked within 48 hours for urgent productions.' },
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
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Ready to Shoot?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Your production.<br />Our talent.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Professional models matched to your project. From solo shoots to full productions. South Florida.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=shoot" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Your Shoot <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-6 text-black/40 text-xs self-center">
              <span>✓ Same-week availability</span>
              <span>✓ Celebrity-level talent</span>
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
