import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, MapPin, Phone, TrendingUp, Camera, Clock, Sparkles, BarChart3, Repeat } from 'lucide-react';
import MobileNav from '../../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Brand Ambassadors Miami — Business Content & On-Site Creators Florida | Influence',
  description: 'Miami brand ambassadors. Creators visit your business to create reels, stories, and promo content on-site. Serving Miami, Fort Lauderdale, Boca Raton, Palm Beach restaurants, salons, gyms, retail.',
  openGraph: {
    title: 'Brand Ambassadors Miami — Business Content & On-Site Creators Florida',
    description: 'Miami business content creation. Creators visit your location for reels, stories, promos. Serving South Florida.',
    url: 'https://influencecreators.marketing/services/business',
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Business Content & Brand Ambassadors",
  "description": "Professional creators visit your business location and create reels, stories, and promo content on-site. Perfect for restaurants, salons, gyms, retail stores. South Florida. From $300.",
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
    "price": "300",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export default function BusinessContentPage() {
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
            <Link href="/start?service=business" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book a Creator</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Maria/maria-1.jpg" alt="Business Content" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Brand Ambassadors · South Florida</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
            Your Brand.<br />Her Face On It.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Pick a date. A professional model arrives at your business — your restaurant, salon, gym, store, whatever — and creates reels, stories, and promo content on the spot. You get everything delivered same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start?service=business" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book a Brand Ambassador <ChevronRight className="h-4 w-4" />
            </Link>
            <a href="tel:+15612877194" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              <Phone className="h-4 w-4" /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>The Problem</p>
          <h2 className="font-display font-light italic text-white leading-tight mb-8" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            You know your business needs social media content.<br />
            <span className="text-white/30">But you don&apos;t have the time, the models, or the setup.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { problem: 'Posting inconsistently', result: 'Algorithm buries your page. No one sees your business.' },
              { problem: 'Using stock photos', result: 'Looks generic. Doesn\'t stand out in a competitive feed.' },
              { problem: 'DIY content', result: 'Takes hours, looks amateur. Not what converts followers into customers.' },
            ].map(({ problem, result }) => (
              <div key={problem} className="border border-white/[0.06] p-6">
                <p className="text-white font-bold text-sm mb-2">❌ {problem}</p>
                <p className="text-white/35 text-[13px] leading-relaxed">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>The Solution</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            We send the model.<br />She makes the content.<br />You post and grow.
          </h2>
          <p className="text-white/45 text-lg max-w-xl mb-14">It&apos;s that simple. No production crew needed. No planning headaches. Just pick a date and let us handle the rest.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Pick a Date', desc: 'Choose when you want the ambassador to come to the business.' },
              { num: '02', title: 'She Shows Up Ready', desc: 'Professional model arrives at your business — styled, on-time, and briefed on your brand. She creates reels, stories, and photos on-site.' },
              { num: '03', title: 'Content Delivered', desc: 'You receive the files to post on Instagram, TikTok, and Facebook.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="border border-white/[0.06] p-8">
                <p className="font-display font-bold italic text-4xl mb-4" style={{ color: gold }}>{num}</p>
                <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Packages</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Flexible packages. No hidden fees.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {[
            { name: 'Solo Visit', desc: '1 model · 2hr session', pieces: '3–5 reels & stories', popular: false },
            { name: 'Content Day', desc: '1 model · 4hr session', pieces: '8–12 content pieces', popular: true },
            { name: 'Full Production', desc: '2 models · 4hr session', pieces: '12–20 content pieces', popular: false },
          ].map(({ name, desc, pieces, popular }) => (
            <div key={name} className="border p-8 flex flex-col" style={{ borderColor: popular ? gold : 'rgba(255,255,255,0.06)', backgroundColor: popular ? 'rgba(201,169,110,0.03)' : 'transparent' }}>
              {popular && <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>Most Popular</p>}
              <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
              <p className="text-white/35 text-sm mb-4">{desc}</p>
              <div className="space-y-2.5 mb-6">
                {[desc, pieces, 'South Florida · same-week booking', 'Content delivered within 24hrs'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
                    <span className="text-white/40 text-[13px]">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/start?service=business" className="mt-auto flex items-center justify-center gap-2 py-4 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-85" style={{ backgroundColor: popular ? gold : 'transparent', color: popular ? '#000' : 'rgba(255,255,255,0.5)', border: popular ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                Book Now <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs mt-6 max-w-xl">All business content visits serve the South Florida / Greater Miami area. </p>
      </section>

      {/* Who It's For */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Who It&apos;s For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          If you have a business,<br />you need this content.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
          {[
            'Restaurants & Bars', 'Salons & Spas', 'Gyms & Studios', 'Retail & Boutiques',
            'Med Spas & Clinics', 'Real Estate', 'Car Dealerships', 'Hotels & Airbnbs',
          ].map(biz => (
            <div key={biz} className="flex items-center gap-3 p-4 border border-white/[0.06]">
              <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
              <span className="text-white/55 text-[13px] font-medium">{biz}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithm Section */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Why It Works</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            The algorithm rewards<br />what stops the scroll.
          </h2>
          <p className="text-white/45 text-base max-w-xl mb-12 leading-relaxed">
            Instagram, TikTok, Facebook, and YouTube Shorts all prioritize content that gets engagement. Professional creators in your content = more likes, more shares, more saves, more reach. It&apos;s not a theory — it&apos;s how the algorithm works.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: BarChart3, title: 'Higher Engagement Rate', desc: 'Content with attractive creators gets 3–5x more engagement than standard business posts. More engagement = more algorithmic reach.' },
              { icon: TrendingUp, title: 'Boosted Discovery', desc: 'When your reels get saves and shares, platforms push them to the Explore page and For You feed — reaching thousands of potential customers.' },
              { icon: Repeat, title: 'Content Library', desc: 'One 2-hour session produces 3–5+ pieces of content. That\'s weeks of posting material from a single visit.' },
              { icon: Sparkles, title: 'Professional Quality', desc: 'No more phone photos. Our creators know angles, lighting, and how to make your business look incredible on camera.' },
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

      {/* Service Area */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Service Area</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Serving South Florida Businesses
        </h2>
        <p className="text-white/45 text-lg max-w-2xl mb-12 leading-relaxed">
          We bring professional creators directly to your business location across South Florida. From Miami to Palm Beach, our brand ambassadors create on-site content that drives real results for local businesses.
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

      {/* CTA */}
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Ready to Grow?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Your business deserves<br />content that converts.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">One visit. Weeks of content. Real results for your social media.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start?service=business" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Book a Brand Ambassador <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-6 text-black/40 text-xs self-center">
              <span>✓ South Florida</span>
              <span></span>
              <span>✓ Custom packages</span>
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
