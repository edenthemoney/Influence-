import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Star, Film, Clapperboard, Camera, Sparkles } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Book Actress Models in Miami — Acting, Casting & Speaking Roles | Influence',
  description: 'Hire professional actress models in Miami for commercials, TV, film, casting calls, speaking roles, and brand campaigns. Our talent includes models with Netflix, Audible, and major production credits. South Florida.',
  openGraph: {
    title: 'Book Actress Models in Miami — Acting & Casting | Influence',
    description: 'Professional actress models with on-camera, commercial, and film experience. From $599.',
    url: 'https://influencemodels.agency/actress-models-miami',
  },
};

export default function ActressModelsMiamiPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
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
            <Link href="/model-booking?service=commercial" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Des/des-5.jpg" alt="Actress models in Miami" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Miami Talent Agency · Acting & Casting</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
            Actress Models{'\n'}in Miami.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Book actress-ready models for commercials, TV, film, casting calls, and speaking roles. Our South Florida roster includes talent with Netflix, Audible, and major production credits — from Deseray Marie’s film work to voiceover artists ready for your next campaign.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=commercial" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Actress Talent <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              Browse Roster
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What We Facilitate</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Acting, casting &{'\n'}on-camera roles.
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-14 leading-relaxed">
          Influence is more than a model agency — we function as a casting partner for productions, brands, and creators who need talent that can act, speak, and perform on camera.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {[
            { icon: Film, title: 'Actress Roles', desc: 'Cast models for scripted scenes, short films, web series, and TV productions.' },
            { icon: Clapperboard, title: 'Commercial Casting', desc: 'Talent with speaking ability, natural delivery, and on-camera experience for brand spots.' },
            { icon: Sparkles, title: 'Voiceover Talent', desc: 'Book models and creators with voiceover credits for narration, ads, and audio projects.' },
            { icon: Camera, title: 'Brand Campaigns', desc: 'Actress models for lifestyle, beauty, fashion, and product-focused campaigns.' },
            { icon: Star, title: 'Production Credits', desc: 'Talent with Netflix, Audible, Peacock, and major commercial experience.' },
            { icon: Camera, title: 'Casting Calls', desc: 'We help source, screen, and coordinate talent for your casting needs.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 border border-white/[0.06] bg-white/[0.01]">
              <Icon className="h-6 w-6 mb-4" style={{ color: gold }} />
              <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Need Casting Support?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Cast your next{'\n'}project.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Book actress models and voiceover talent with real production experience. South Florida and nationwide remote options.</p>
          <Link href="/model-booking?service=commercial" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
            Book Actress Models <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

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
                  <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/actress-models-miami" className="text-white/40 hover:text-white transition-colors text-sm">Actress Models</Link></li>
                  <li><Link href="/casting-agency-miami" className="text-white/40 hover:text-white transition-colors text-sm">Casting Agency</Link></li>
                  <li><Link href="/voiceover-talent-miami" className="text-white/40 hover:text-white transition-colors text-sm">Voiceover Talent</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
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
