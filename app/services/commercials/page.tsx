import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Film, Mic, Users, Star, Clock, Clapperboard, Check } from 'lucide-react';
import MobileNav from '../../components/MobileNav';
import { hideCopy } from '@/data/partners';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Commercial Creators Miami — TV Commercials & Speaking Roles Florida | Influence',
  description: 'Miami commercial creators. Professional actresses for TV commercials, web ads, brand spots & speaking roles in Miami, Fort Lauderdale, Boca Raton, Palm Beach. Script reading, dialogue, voiceover.',
  openGraph: {
    title: 'Commercial Creators Miami — TV Commercials & Speaking Roles Florida',
    description: 'Miami commercial creators with acting & speaking ability. Serving South Florida.',
    url: 'https://influencecreators.marketing/services/commercials',
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercials & Speaking Roles",
  "description": "Professional creators and actresses for TV commercials, web ads, brand spots, and speaking roles. Script reading, dialogue, voiceover. South Florida. From $599.",
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
    "Pompano Beach"
  ],
  "offers": {
    "@type": "Offer",
    "price": "599",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export default function CommercialsPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
            <Link href="/start?service=commercial" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Des/des-5.jpg" alt="Commercials" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>In-Person · South Florida</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
            Models for{'\n'}Commercials.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Need models who can speak, act, and deliver lines on camera? Book professional creators for TV spots, web commercials, brand ads, and any production requiring spoken delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start?service=commercial" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book Commercial Creators <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              Browse Models
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What Makes This Different</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          More than just{'\n'}a pretty face.
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-14 leading-relaxed">
          Commercial bookings include spoken material — script reading, dialogue, voiceover, and on-camera acting. Our creators is briefed, rehearsed, and production-ready.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
          {[
            { title: 'Script Reading', desc: 'Natural delivery of your script — product pitches, brand messaging, testimonials.' },
            { title: 'Dialogue & Acting', desc: 'Multi-person scripted scenes with professional, natural delivery.' },
            { title: 'Voiceover Ready', desc: 'Clean voice delivery for narration, radio spots, and off-camera audio.' },
            { title: 'Teleprompter Comfortable', desc: 'Experienced with teleprompter and cue cards for longer scripts.' },
            { title: 'Multiple Takes', desc: 'Professional consistency across takes — your director gets what they need.' },
            { title: 'Wardrobe Flexible', desc: 'Multiple looks or your provided wardrobe and styling.' },
          ].map(({ title, desc }) => (
            <div key={title} className="p-6 border border-white/[0.06] bg-white/[0.01]">
              <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Commercial Packages</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Pick your package.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
          {[
            { name: 'Solo', desc: '1 model · half-day · scripted', popular: false },
            { name: 'Full Day', desc: '1 model · full day · multi-scene', popular: false },
            { name: 'Duo', desc: '2 models · half-day · dialogue', popular: true },
            { name: 'Squad', desc: '5+ models · large-cast', popular: false },
          ].map(({ name, desc, popular }) => (
            <div key={name} className="border p-7 flex flex-col" style={{ borderColor: popular ? gold : 'rgba(255,255,255,0.06)', backgroundColor: popular ? 'rgba(201,169,110,0.03)' : 'transparent' }}>
              {popular && <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: gold }}>Most Popular</p>}
              <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
              <p className="text-white/35 text-sm mb-5">{desc}</p>
              <Link href="/start?service=commercial" className="mt-auto flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all hover:opacity-85" style={{ backgroundColor: popular ? gold : 'transparent', color: popular ? '#000' : 'rgba(255,255,255,0.5)', border: popular ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                Book <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs mt-6">All commercial bookings include script preparation and wardrobe coordination. Monthly subscriptions available.</p>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Perfect For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Every commercial type.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { icon: Film, title: 'TV & Streaming Commercials', desc: 'Broadcast-quality creators for television and streaming ads.' },
            { icon: Mic, title: 'Social Media Ads', desc: 'Natural delivery for Instagram, YouTube, TikTok video ads.' },
            { icon: Clapperboard, title: 'Brand Testimonials', desc: 'Convincing delivery for product testimonials and endorsements.' },
            { icon: Star, title: 'Product Demos', desc: 'Creators who demonstrate products while speaking naturally.' },
            { icon: Users, title: 'Multi-Person Scenes', desc: 'Scripted interactions — conversations, scenarios, storylines.' },
            { icon: Clock, title: 'Rush & Same-Week', desc: 'Commercial-ready creators booked within 48 hours.' },
          ].filter(({ title, desc }) => !hideCopy(`${title} ${desc}`) && !hideCopy(desc)).map(({ icon: Icon, title, desc }) => (
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
          South Florida Commercial Production
        </h2>
        <p className="text-white/45 text-lg max-w-2xl mb-12 leading-relaxed">
          Our commercial creators and production services are available across South Florida. From Miami studios to on-location shoots in Fort Lauderdale, Boca Raton, and Palm Beach, we provide professional creators and actresses for your commercial production needs.
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
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Ready to Produce?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Your commercial.{'\n'}Our creators.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Professional creators with script delivery, dialogue, and acting ability. South Florida.</p>
          <Link href="/start?service=commercial" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
            Book Your Commercial <ChevronRight className="h-4 w-4" />
          </Link>
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
            <Link href="/services/shoots" className="group border border-white/[0.06] p-8 hover:border-white/[0.15] transition-all duration-300">
              <h3 className="text-white font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Shoots & Music Videos</h3>
              <p className="text-white/35 text-sm leading-relaxed">Book creators for photo shoots, music videos, commercials, and professional video productions.</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-4" style={{ color: gold }}>Learn More →</p>
            </Link>
          </div>
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
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Creators</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/start" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Creators</Link></li>
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
            <Link href="https://www.instagram.com/influencecreators.marketing" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
            <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
