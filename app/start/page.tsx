import Link from 'next/link';
import { Check, Phone } from 'lucide-react';
import MobileNav from '../components/MobileNav';
import StartSelector from './StartSelector';

const gold = '#c9a96e';

export const metadata = {
  title: 'Book Social Media Influencers, Models & Creators — Influence Agency',
  description: 'Book social media influencers, models, creators, event hostesses, and music video talent near you. UGC content, paid Instagram shoutouts, influencer campaigns, and bottle girls in Miami.',
  openGraph: {
    title: 'Book Social Media Influencers, Models & Creators',
    description: 'Choose your project type and book verified influencers and creators in minutes.',
    url: 'https://influencemodels.agency/start',
  },
};

export default function StartPage() {
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
            <Link href="/quote" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Talk to a Rep</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-12 md:pb-16 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a96e]/[0.07] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Verified Talent · South Florida & Nationwide</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>
            What Do You<br />Want to Create?
          </h1>
          <p className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re a brand, an artist, or a venue — pick what you need below and we&apos;ll match you with verified creators and models, then tailor a quote to your project.
          </p>
        </div>
      </section>

      {/* Social proof credits */}
      <section className="px-8 md:px-16 pb-10 md:pb-14">
        <p className="text-center text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5">Our talent has worked with</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 max-w-4xl mx-auto">
          {['Sean Paul', 'Kai Cenat', 'Bryson Tiller', 'Moneybagg Yo', 'Forbes', 'Fenty Beauty', 'Netflix', 'Miami Swim Week'].map((name) => (
            <span key={name} className="font-display font-light italic text-white/30 text-base md:text-xl">{name}</span>
          ))}
        </div>
      </section>

      {/* Two-step selector */}
      <section className="px-8 md:px-16 pb-16 md:pb-24">
        <StartSelector />
      </section>

      {/* Trust Bar */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-12 md:py-16 px-8 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12">
          {['Verified Talent', 'Same-Week Booking', 'No Flakes', 'HD Content Delivered', 'South Florida'].map((badge) => (
            <span key={badge} className="text-white/30 text-[10px] tracking-widest uppercase flex items-center gap-2">
              <Check className="h-3 w-3" style={{ color: gold }} /> {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Not Sure */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold italic text-white mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Not Sure What You Need?
          </h2>
          <p className="text-white/45 text-lg mb-10 max-w-xl mx-auto">
            Tell us your goal and we&apos;ll recommend the right talent and a tailored quote — usually within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              <Phone className="h-4 w-4" /> Talk to a Rep
            </Link>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              Browse Our Talent
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
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Talent</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                  <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/music-video-booking" className="text-white/40 hover:text-white transition-colors text-sm">Music Video Talent</Link></li>
                  <li><Link href="/ugc-content" className="text-white/40 hover:text-white transition-colors text-sm">UGC Content</Link></li>
                  <li><Link href="/event-talent" className="text-white/40 hover:text-white transition-colors text-sm">Event Talent</Link></li>
                  <li><Link href="/models-for-shoots" className="text-white/40 hover:text-white transition-colors text-sm">Models for Shoots</Link></li>
                  <li><Link href="/label-campaigns" className="text-white/40 hover:text-white transition-colors text-sm">Label Campaigns</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/quote" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
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
  );
}
