import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Mic, Headphones, Radio, Volume2, Sparkles, BookOpen } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Hire Voiceover Talent in Miami — Audiobooks, Commercials & Brand Ads | Influence',
  description: 'Book professional voiceover talent in Miami for commercials, audiobooks, brand ads, narration, and audio campaigns. Talent with Audible, Netflix, and major production experience.',
  openGraph: {
    title: 'Hire Voiceover Talent in Miami — Audiobooks & Commercials | Influence',
    description: 'Professional voiceover talent for audiobooks, commercials, ads, and narration.',
    url: 'https://influencemodels.agency/voiceover-talent-miami',
  },
};

export default function VoiceoverTalentMiamiPage() {
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
            <Link href="/contact" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Voiceover</Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Des/des-5.jpg" alt="Voiceover talent in Miami" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Miami Voiceover Talent</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
            Voiceover{'\n'}Talent.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Hire professional voiceover artists for commercials, audiobooks, brand ads, narration, and audio campaigns. Our talent includes experienced voices with Audible, Netflix, and major production credits — available in South Florida and remotely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Voiceover Talent <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              Browse Roster
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Voiceover Services</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            The right voice{'\n'}for any project.
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-14 leading-relaxed">
          From smooth narration to energetic commercial reads, we connect you with voiceover talent that brings your script to life — for ads, audiobooks, podcasts, and brand content.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {[
            { icon: Mic, title: 'Commercial Voiceover', desc: 'Clean, confident reads for TV, radio, and digital ads.' },
            { icon: BookOpen, title: 'Audiobooks & Narration', desc: 'Long-form storytelling voices for audiobooks, documentaries, and e-learning.' },
            { icon: Radio, title: 'Brand & Podcast Intros', desc: 'Signature voice branding for podcasts, channels, and content series.' },
            { icon: Volume2, title: 'Social Media Ads', desc: 'Natural voiceover for Instagram, TikTok, and YouTube video ads.' },
            { icon: Headphones, title: 'Remote Recording', desc: 'Professional home-studio recordings delivered remotely.' },
            { icon: Sparkles, title: 'Production Credits', desc: 'Talent with Audible, Netflix, and major commercial voiceover experience.' },
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
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Need a Voice?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Find your voice.{'\n'}Book talent.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Professional voiceover talent for commercials, audiobooks, and brand content. Remote and in-studio options available.</p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
            Hire Voiceover Talent <ChevronRight className="h-4 w-4" />
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
