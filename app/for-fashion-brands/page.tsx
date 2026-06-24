import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, Shirt, Camera, Star, Play, Instagram, Package } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Influencer Marketing for Fashion & Clothing Brands — Influence Agency',
  description: 'Book verified models and influencers to wear and promote your clothing brand. UGC reels, product seeding, model shoots, and Instagram shoutouts. Miami-based agency. From $150.',
  keywords: [
    'influencer marketing for fashion brands',
    'clothing brand influencer',
    'fashion influencer agency Miami',
    'model wearing my clothing',
    'influencer for clothing brand',
    'fashion UGC content',
    'clothing brand model shoot',
    'fashion brand ambassador',
    'product seeding fashion',
    'Instagram shoutout fashion brand',
    'hire model for fashion brand',
    'merch influencer promotion',
  ],
  openGraph: {
    title: 'Influencer Marketing for Fashion & Clothing Brands — Influence',
    description: 'Models wear and promote your clothing brand. UGC reels, shoots, shoutouts & product seeding. From $150.',
    url: 'https://influencemodels.agency/for-fashion-brands',
  },
};

const services = [
  {
    icon: Play,
    name: 'UGC Reels & TikToks',
    subtitle: 'Model wears your clothing on camera',
    desc: 'Send us your pieces — a model creates branded reels, try-on videos, outfit showcases, and lifestyle content to your brief. HD vertical video delivered ready to post or run as ads.',
    from: '$300',
    href: '/model-booking?service=ugc',
    cta: 'Book UGC',
    checks: [
      'Try-on hauls & outfit reveals',
      'Trending audio + lifestyle hooks',
      'IG Reels, TikTok & YouTube Shorts ready',
      'Multiple angles & hooks for A/B testing',
      'Delivered in 3–5 days',
    ],
  },
  {
    icon: Camera,
    name: 'Photo & Video Shoot',
    subtitle: 'Professional model in your clothing',
    desc: 'Book a professional Miami model for a photo or video shoot wearing your brand. Get a full content library — product shots, lifestyle images, campaign content — in one session.',
    from: '$300',
    href: '/model-booking?service=shoot',
    cta: 'Book a Shoot',
    checks: [
      '1–10+ professional models available',
      'Half-day or full-day sessions',
      'Campaign, editorial & e-commerce styles',
      'South Florida locations',
      'Add photographer/videographer as needed',
    ],
  },
  {
    icon: Instagram,
    name: 'Instagram Shoutout',
    subtitle: 'Verified influencer posts your brand',
    desc: 'A verified influencer posts your clothing to their engaged following — feed post or Story with your link/caption. Fast turnaround, real reach, no production required.',
    from: '$100',
    href: '/model-booking?service=ugc',
    cta: 'Get a Shoutout',
    checks: [
      'Verified influencer with engaged audience',
      'IG feed post or Stories',
      'Custom caption with your brand & link',
      '48-hour delivery',
      'Perfect for drops, launches & promos',
    ],
  },
  {
    icon: Package,
    name: 'Gifted / Product Seeding',
    subtitle: 'Ship it — we post it',
    desc: "Send your clothing to one of our creators and they'll wear it, film an authentic unboxing or first-wear reaction, and post it. The most cost-effective way to get real content fast.",
    from: '$300',
    href: '/model-booking?service=ugc',
    cta: 'Start Seeding',
    checks: [
      'Authentic first-wear or unboxing content',
      'No brief required — just ship it',
      'IG or TikTok posting',
      'HD video delivered to you too',
      'Best entry point for new brands',
    ],
  },
];

const stats = [
  { value: '3–5x', label: 'More Engagement', desc: 'Content featuring models in your clothing vs. standard product shots.' },
  { value: '48hrs', label: 'Delivery', desc: 'UGC content in your inbox within 48 hours of approval — ready to post or run as ads.' },
  { value: '$300', label: 'Starting Price', desc: 'The most affordable way to get professional model content for your clothing brand.' },
];

export default function ForFashionBrandsPage() {
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
            <Link href="/model-booking?service=ugc" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Des/des-3.jpg" alt="Fashion Brand Influencer Marketing" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Fashion &amp; Clothing Brands</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
            Your Brand.<br />Our Models.<br />Their Feed.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Verified models and influencers wear and promote your clothing brand — UGC reels, shoots, shoutouts, and product seeding. Built for fashion brands that want real content, fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=ugc" className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Get Content <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/model-booking?service=shoot" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              <Camera className="h-4 w-4" /> Book a Shoot
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-8 px-8 md:px-16">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {['UGC Reels', 'Try-On Videos', 'Model Shoots', 'Instagram Shoutouts', 'Product Seeding', 'Brand Campaigns'].map(item => (
            <span key={item} className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">{item}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
          {stats.map(({ value, label, desc }) => (
            <div key={label} className="border border-white/[0.06] p-7 text-center">
              <p className="font-display font-bold italic text-4xl text-white mb-1">{value}</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>{label}</p>
              <p className="text-white/35 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>What We Offer</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
          Four ways to promote<br />your clothing brand.
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {services.map(({ icon: Icon, name, subtitle, desc, from, href, cta, checks }) => (
            <div key={name} className="border border-white/[0.06] p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border flex items-center justify-center flex-shrink-0" style={{ borderColor: gold }}>
                  <Icon className="h-5 w-5" style={{ color: gold }} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
                  <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">{subtitle}</p>
                </div>
              </div>
              <p className="text-white/45 text-[14px] leading-relaxed mb-6">{desc}</p>
              <div className="space-y-3 mb-8">
                {checks.map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                    <span className="text-white/40 text-[13px]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <p className="font-display font-bold italic text-2xl" style={{ color: gold }}>From {from}</p>
                <Link href={href} className="text-[11px] font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors flex items-center gap-2">
                  {cta} <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Who It&apos;s For</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Built for every type<br />of fashion brand.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {[
            { title: 'Clothing Startups', desc: 'Launching a brand and need content fast? Product seeding and UGC reels are your lowest-cost, highest-impact starting point.' },
            { title: 'Merch Drops', desc: 'Dropping new merch? Models wear and post your pieces the day of your drop to generate immediate hype and social proof.' },
            { title: 'Swimwear & Activewear', desc: 'Show your pieces on real bodies, in real environments. Miami shoots or remote UGC — we have models for every style.' },
            { title: 'Luxury & Streetwear', desc: 'Our roster includes high-fashion editorial talent and streetwear-native creators. We match the right model to your aesthetic.' },
            { title: 'E-commerce Brands', desc: 'Need product photos and lifestyle video for your Shopify store? One shoot session gives you a full content library.' },
            { title: 'Established Labels', desc: 'Running a full campaign? Multi-model shoots, coordinated influencer rollouts, and dedicated account management available.' },
          ].map(({ title, desc }) => (
            <div key={title} className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>How It Works</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Content in 3 steps.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
          {[
            { step: '01', title: 'Choose Your Service', desc: 'Pick UGC reels, a model shoot, a shoutout, or product seeding — based on your budget and goals.' },
            { step: '02', title: 'Book & Brief Us', desc: 'Select your package, tell us your brand aesthetic, ship your product if needed, and we handle the rest.' },
            { step: '03', title: 'Receive & Post', desc: 'HD content delivered to your inbox within 48–96 hours. Ready to post, run as ads, or add to your site.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="border border-white/[0.06] p-8">
              <p className="font-display font-bold italic text-5xl mb-4" style={{ color: gold, opacity: 0.4 }}>{step}</p>
              <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-16 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-3xl">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: gold }} />)}
          </div>
          <p className="text-white/55 text-lg md:text-xl italic leading-relaxed mb-6">
            &ldquo;We sent over 3 pieces and got back 6 reels within 48 hours. Our TikTok views went from 200 to 40,000 on the first post. This is exactly what our brand needed.&rdquo;
          </p>
          <p className="text-white/25 text-[11px] tracking-widest uppercase">— Fashion Brand Client · Miami, FL</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Fashion Brands · Start Here</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Your brand deserves<br />to be seen.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Real models. Real content. Real reach. Start with a single reel or book a full shoot — we scale with you. From $150.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/model-booking?service=ugc" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Get Started <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-6 text-black/40 text-xs self-center">
              <span>✓ From $150</span>
              <span>✓ 48hr delivery</span>
              <span>✓ Miami-based</span>
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
