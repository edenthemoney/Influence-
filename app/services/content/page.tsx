import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, Phone, Play, Headphones, TrendingUp, Share2, BarChart3, Globe, Zap, Instagram, Youtube } from 'lucide-react';
import MobileNav from '../../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Social Media Content & Music Reactions — Influence Agency',
  description: 'Beautiful models promote your brand or react to your music on camera. UGC reels, TikToks, music reactions, and branded content delivered to you. Nationwide.',
  openGraph: {
    title: 'Social Media Content & Music Reactions — Influence',
    description: 'Models create scroll-stopping content for your brand or music. Delivered to your inbox. Nationwide.',
    url: 'https://influencemodels.agency/services/content',
  },
};

export default function ContentPage() {
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
            <Link href="/model-booking?service=ugc" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Get Content</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Ferrari/ferrari-1.jpg" alt="Social Media Content" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Remote · Nationwide</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
            Dominate Every<br />Algorithm.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Beautiful models promote your brand, react to your music, launch viral challenges, and create content that stops the scroll — across Instagram, TikTok, YouTube, and every platform that matters. All delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=ugc" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Get Content <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/model-booking?service=reaction" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              <Headphones className="h-4 w-4" /> Music Reactions
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Icons */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-10 md:py-14 px-8 md:px-16">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter / X', 'Spotify'].map(platform => (
            <span key={platform} className="text-white/20 text-[11px] font-bold tracking-[0.3em] uppercase">{platform}</span>
          ))}
        </div>
        <p className="text-center text-white/15 text-[10px] tracking-widest uppercase mt-3">Content delivered ready to post on every platform</p>
      </section>

      {/* Two Services Side by Side */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Two Ways We Help</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
          Content that works.<br />For every type of client.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* UGC */}
          <div className="border border-white/[0.06] p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border flex items-center justify-center" style={{ borderColor: gold }}>
                <Play className="h-5 w-5" style={{ color: gold }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">UGC & Branded Reels</h3>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">For Brands · Products · Businesses</p>
              </div>
            </div>
            <p className="text-white/45 text-[14px] leading-relaxed mb-6">
              Models create branded skits, product showcases, lip-syncs, and promotional reels to your brief. You get HD video files delivered — ready to post on your pages or use as paid ads.
            </p>
            <div className="space-y-3 mb-8">
              {[
                'Branded reels & TikToks to your brief',
                'Product showcase & lifestyle content',
                'Lip-sync & trending audio promos',
                'Viral challenge & trend creation',
                'Multiple hooks & formats for A/B testing',
                'HD vertical video delivered in 3–5 days',
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                  <span className="text-white/40 text-[13px]">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <Link href="/model-booking?service=ugc" className="text-[11px] font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors flex items-center gap-2">
                Book <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Reactions */}
          <div className="border border-white/[0.06] p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border flex items-center justify-center" style={{ borderColor: gold }}>
                <Headphones className="h-5 w-5" style={{ color: gold }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Music Reactions</h3>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">For Artists · Labels · Producers</p>
              </div>
            </div>
            <p className="text-white/45 text-[14px] leading-relaxed mb-6">
              Models listen to your song and react on camera — genuine first-listen reactions that build hype, social proof, and engagement. Perfect for new releases, singles, and album drops.
            </p>
            <div className="space-y-3 mb-8">
              {[
                'Genuine first-listen song reactions',
                'Full album livestream reactions',
                'Trend & challenge launch around your track',
                'Multi-model campaigns for max reach',
                'HD vertical video ready to post',
                'Models post to their own followers too',
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                  <span className="text-white/40 text-[13px]">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <Link href="/model-booking?service=reaction" className="text-[11px] font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors flex items-center gap-2">
                Book <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Domination */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Why It Works</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Beautiful models +<br />your brand = virality.
          </h2>
          <p className="text-white/45 text-base max-w-xl mb-14 leading-relaxed">
            Every platform&apos;s algorithm rewards content that gets engagement. Attractive models in your content naturally get more likes, shares, saves, and comments — which means more reach, more followers, and more customers.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, stat: '3–5x', label: 'More Engagement', desc: 'Content with professional models consistently outperforms standard posts across every platform.' },
              { icon: Globe, stat: '10x', label: 'More Reach', desc: 'Higher engagement signals tell the algorithm to push your content to Explore and For You pages.' },
              { icon: Share2, stat: '48hrs', label: 'Delivery Time', desc: 'Order today, have professional content in your inbox within 48 hours. Ready to post immediately.' },
            ].map(({ icon: Icon, stat, label, desc }) => (
              <div key={label} className="border border-white/[0.06] p-7 text-center">
                <Icon className="h-6 w-6 mx-auto mb-4" style={{ color: gold }} />
                <p className="font-display font-bold italic text-3xl text-white mb-1">{stat}</p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>{label}</p>
                <p className="text-white/35 text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Who It&apos;s For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Artists. Brands. Labels.<br />Anyone who wants to win online.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {[
            { title: 'Independent Artists', desc: 'Promote your single, EP, or album with genuine reaction content, promo reels, and coordinated viral challenges — build real hype before your drop.' },
            { title: 'Record Labels', desc: 'Multi-model campaigns for your roster. Coordinated reaction rollouts, trend launches, and social buzz for every release.' },
            { title: 'Brands & Products', desc: 'UGC content that sells. Models showcase your product in lifestyle reels, unboxing videos, branded TikToks, and viral challenges built around your brand.' },
            { title: 'Business Owners', desc: 'Even if you\'re remote — models can create content featuring your brand, product, or service and deliver it to you.' },
            { title: 'Marketing Agencies', desc: 'White-label content for your clients. We create, you deliver. Bulk pricing available for agency partnerships.' },
            { title: 'Apps & Startups', desc: 'Launch content, demo videos, user testimonials — models promote your app with scroll-stopping short-form content.' },
          ].map(({ title, desc }) => (
            <div key={title} className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Service Area</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Nationwide Delivery, South Florida Roots
        </h2>
        <p className="text-white/45 text-lg max-w-2xl mb-12 leading-relaxed">
          Our UGC and music reaction services are available nationwide — we deliver professional content directly to your inbox wherever you are. For in-person shoots and events, we serve the entire South Florida region from Miami to Palm Beach.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {[
            'Miami', 'Fort Lauderdale', 'Boca Raton', 'Palm Beach',
            'West Palm Beach', 'Delray Beach', 'Hollywood', 'Pompano Beach',
            'Hallandale Beach', 'Aventura', 'Sunny Isles Beach', 'Miami Beach',
            'Coral Gables', 'Key Biscayne', 'Nationwide UGC', 'Nationwide Music Reactions'
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
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Start Growing</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Stop scrolling.<br />Start dominating.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Professional content delivered in 3 days. No production crew needed. Just order, approve, and post.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Get Started <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-6 text-black/40 text-xs self-center">
              <span>✓ Nationwide</span>
              <span>✓ 48hr delivery</span>
              <span>✓ Custom packages</span>
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
