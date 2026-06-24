import Link from 'next/link';
import Image from 'next/image';
import MobileNav from '../components/MobileNav';
import type { Metadata } from 'next';
import { Target, Zap, Users, TrendingUp, Award, ChevronRight, Wine } from 'lucide-react';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'About Influence — South Florida Influencer Marketing Agency',
  description: 'Meet the founders of Influence, a South Florida-based influencer marketing agency. Eden Roy and Deseray Marie connect brands, artists, and businesses with elite influencers for UGC content, music promotion, event hosting, and more.',
  openGraph: {
    title: 'About Influence — South Florida Influencer Marketing Agency',
    description: 'Meet Eden Roy and Deseray Marie — the founders behind Influence, connecting brands with elite influencers in South Florida and beyond.',
    url: 'https://influencemodels.agency/about',
  },
};

export default function AboutPage() {
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
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 md:px-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: gold }}>Who We Are</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>
            About <span style={{ color: gold }}>Influence</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Influence is a South Florida-based influencer marketing agency connecting brands, artists, and businesses
            with elite influencers who deliver authentic engagement, viral content, and real results.
          </p>
        </div>
      </section>

      {/* ── Meet the Founders ── */}
      <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 md:px-14 py-20 md:py-28">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-center" style={{ color: gold }}>Leadership</p>
          <h2 className="font-display font-bold italic text-white text-center mb-16 md:mb-20" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Meet the Founders
          </h2>

          {/* Deseray */}
          <div className="grid md:grid-cols-2 gap-0 mb-0 border border-white/[0.06]">
            <div className="relative h-[50vh] md:h-auto overflow-hidden">
              <Image src="/images/Des/des-5.jpg" alt="Deseray Marie — Co-Founder of Influence" fill className="object-cover object-top" />
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Co-Founder &amp; Creative Director</p>
              <h3 className="font-display font-bold italic text-white mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Deseray Marie</h3>
              <p className="text-white/30 text-xs tracking-widest uppercase mb-6">@itsdezmarie &middot; 62K Followers</p>
              <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                Deseray Marie is a professional model, actress, and content creator based in South Florida with a career spanning fashion, film, music, and brand partnerships at the highest level.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'Featured in Forbes, Fenty Beauty, SavageXFenty & Meta Ray-Ban',
                  'Music videos with Sean Paul, Bryson Tiller, DaBaby, Akon, Moneybagg Yo, Lil Pump, 6ix9ine, Bossman Dlow & Young Thug',
                  'Celebrity work with Kai Cenat, AMP, Mike Tyson, Tyra Banks & Keke Palmer',
                  'TV: Love & Hip Hop · Films: Sacrifice, Spanish Fly',
                  '20+ magazine features · 10+ fashion show walks across 4 countries',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: gold }} />
                    <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/influencer/des-001" className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors hover:opacity-70" style={{ color: gold }}>
                View Full Profile <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Eden */}
          <div className="grid md:grid-cols-2 gap-0 border border-white/[0.06] border-t-0">
            <div className="p-8 md:p-14 flex flex-col justify-center order-2 md:order-1">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Founder &amp; CEO</p>
              <h3 className="font-display font-bold italic text-white mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Eden Roy</h3>
              <p className="text-white/30 text-xs tracking-widest uppercase mb-6">Agency Owner &middot; Entrepreneur</p>
              <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                Eden Roy is a businessman and entrepreneur with a background in Business and Technology from Florida Atlantic University. He specializes in SEO marketing, digital strategy, and building systems that drive measurable growth for artists and brands.
              </p>
              <div className="space-y-2">
                {[
                  'Florida Atlantic University — Business & Technology',
                  'Expert in SEO, digital marketing & organic growth strategy',
                  'Music management, record label & recording studio owner',
                  'Built Influence from the ground up — technology, operations & business development',
                  'Focused on making influencer marketing accessible, transparent & results-driven',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: gold }} />
                    <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[50vh] md:h-auto overflow-hidden order-1 md:order-2 bg-[#0d0d0d] flex items-center justify-center">
              <div className="text-center p-14">
                <div className="w-28 h-28 mx-auto mb-6 border border-white/[0.08] flex items-center justify-center" style={{ backgroundColor: '#0d0d0d' }}>
                  <span className="font-display font-bold italic text-white" style={{ fontSize: '48px' }}>E</span>
                </div>
                <p className="font-display font-bold italic text-white text-2xl mb-1">Eden Roy</p>
                <p className="text-white/30 text-xs tracking-widest uppercase">Founder &amp; CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="border-t border-white/[0.06] bg-[#080808] py-20 md:py-28 px-6 md:px-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Our Services</p>
          <h2 className="font-display font-bold italic text-white mb-6" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            What We Do
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed mb-12 max-w-2xl">
            Influence is a full-service influencer marketing agency and talent management company. We connect brands with verified influencers across TikTok, Instagram, and YouTube — and manage everything from content creation to campaign analytics.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { Icon: TrendingUp, title: 'Social Media Growth', desc: 'Organic follower growth, engagement, and reach through strategic influencer partnerships and viral UGC campaigns.', href: '/model-booking?service=ugc' },
              { Icon: Users, title: 'Brand Marketing', desc: 'Product launches, brand awareness, and conversion-ready campaigns with niche-aligned influencers who move product.', href: '/model-booking?service=business' },
              { Icon: Zap, title: 'Music Promotion', desc: 'Turn tracks into trending audio. Our influencers create viral content that puts your music in front of millions.', href: '/model-booking?service=reaction' },
              { Icon: Award, title: 'Event Hosting & Appearances', desc: 'Book professional models for parties, club nights, brand activations, and music video shoots across South Florida.', href: '/model-booking?service=event' },
              { Icon: Wine, title: 'Bottle Girls & VIP Hostesses', desc: 'Professional VIP bottle girls and hostesses for nightclubs, lounges, and premium venues. $100/girl/hr — models earn $50/hr.', href: '/model-booking?service=bottle' },
              { Icon: Target, title: 'Business Content', desc: 'We send professional models to your business to create scroll-stopping reels and social content on-site. Perfect for restaurants, salons, gyms, and retail.', href: '/model-booking?service=business' },
            ].map(({ Icon, title, desc, href }) => (
              <Link key={title} href={href} className="p-6 border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] hover:border-[#c9a96e]/20 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="h-5 w-5" style={{ color: gold }} />
                  <h3 className="text-lg font-bold text-white group-hover:text-[#c9a96e] transition-colors">{title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{desc}</p>
                <span className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: gold }}>
                  Book This Service <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-14 md:py-16 px-6 md:px-14">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
          <div>
            <p className="text-white font-bold text-lg sm:text-xl mb-1">Ready to see what we can do for you?</p>
            <p className="text-white/40 text-sm">Pick a service, choose your budget, book in 2 minutes.</p>
          </div>
          <Link href="/model-booking" className="px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-80 transition-all shrink-0" style={{ backgroundColor: gold, color: '#000' }}>
            Book Now →
          </Link>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="border-t border-white/[0.06] bg-[#0a0a0a] py-20 px-6 md:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="border border-white/[0.06] p-8 md:p-12">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 text-center" style={{ color: gold }}>Roster Credentials</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {[
                { stat: '20+', label: 'Magazine Features' },
                { stat: '10+', label: 'Fashion Show Walks' },
                { stat: '4', label: 'Countries' },
                { stat: '50K+', label: 'Combined Reach' },
              ].map(({ stat, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display font-bold italic mb-1" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: gold }}>{stat}</p>
                  <p className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase font-semibold">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-white/25 text-xs text-center italic">
              Stats reflect aggregate published work across our verified talent roster.
            </p>
          </div>
        </div>
      </section>

      {/* ── Niches ── */}
      <section className="border-t border-white/[0.06] bg-[#080808] py-20 px-6 md:px-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Industries We Serve</p>
          <h2 className="font-display font-bold italic text-white mb-10" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Our Expertise by Niche
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Beauty & Skincare', 'Fashion & Luxury', 'Health & Wellness',
              'Music & Entertainment', 'Tech & Innovation', 'Food & Lifestyle',
              'Business & Entrepreneurship', 'Fitness & Sports', 'Travel & Adventure',
              'Gaming & Streaming', 'Education & Self-Development', 'Nightlife & Events',
            ].map((niche) => (
              <div key={niche} className="flex items-center gap-3 p-4 border border-white/[0.06] hover:border-white/10 transition-colors">
                <Target className="h-4 w-4 flex-shrink-0" style={{ color: gold }} />
                <span className="text-white/70 text-sm font-medium">{niche}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="border-t border-white/[0.06] bg-[#0a0a0a] py-20 px-6 md:px-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Why Influence</p>
          <h2 className="font-display font-bold italic text-white mb-12" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Why Brands Choose Us
          </h2>
          <div className="space-y-6">
            {[
              { title: 'Minority & Women-Owned', desc: 'Black, Latino, and women-owned agency. We proudly represent underrepresented founders building in South Florida.' },
              { title: 'Diverse Models, All Backgrounds', desc: 'Our roster includes talent of all ethnicities, body types, and styles. Representation matters in every campaign we run.' },
              { title: 'Celebrity-Connected Talent', desc: 'Our models have worked alongside Sean Paul, Moneybagg Yo, Lil Pump, 6ix9ine, Bossman Dlow, Kai Cenat, Bryson Tiller, Akon & more.' },
              { title: 'Verified Influencers', desc: 'Authenticated metrics, real engagement, proven track records — no fake followers, no bots.' },
              { title: 'Fast Turnaround', desc: 'Most content delivered within 48 hours. Full campaigns complete in 7–14 days.' },
              { title: 'Transparent Pricing', desc: 'No hidden fees. Clear packages with detailed breakdowns at every tier. Starting at $300.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: gold }}>
                  <span className="text-black text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-20 md:py-28 px-6 md:px-14">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-green-500/20 bg-green-500/5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400/80 text-[11px] font-semibold">Same-week availability · Book in 2 min</span>
          </div>
          <h2 className="font-display font-bold italic text-white mb-4" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Ready to Book?</h2>
          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            Pick a service, choose your package, and checkout in under 2 minutes. Starting at $300.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/model-booking" className="px-12 py-5 text-black text-[14px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: gold }}>
              Book Now →
            </Link>
            <Link href="/marketplace" className="px-10 py-5 border border-white/15 text-white text-[13px] font-bold tracking-widest uppercase hover:border-white/30 transition-all">
              Browse Talent First
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-white/30 text-xs">
            <span>✓ Secure Stripe checkout</span>
            <span>✓ Content in 48hrs</span>
            <span>✓ From $300</span>
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
                  <li><Link href="/model-booking?service=bottle" className="text-white/40 hover:text-white transition-colors text-sm">Bottle Girls / VIP</Link></li>
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
