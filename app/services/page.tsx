import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, MapPin, Play, Camera, Sparkles, Headphones, TrendingUp, Film, Wine, Music, Clapperboard } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

export const metadata: Metadata = {
  title: 'Services — Influence Agency | Models, Content, Commercials & Events',
  description: 'Book professional models for social media content, music reactions, business promos, video shoots, TV commercials, and events across South Florida. Starting at $300.',
  openGraph: {
    title: 'Services — Influence Agency',
    description: 'Social media content, music reactions, business visits, shoots, commercials, and events. From $300.',
    url: 'https://influencemodels.agency/services',
  },
};

const services = [
  {
    href: '/services/content',
    tag: 'Remote · Nationwide',
    category: 'Social Media Campaigns',
    title: 'UGC, Reels & Music Reactions',
    desc: 'Models create branded content, react to your music, launch viral challenges, and produce scroll-stopping reels — all delivered to your inbox. Perfect for artists, brands, labels, and businesses.',
    items: ['Music Reactions', 'UGC Reels & TikToks', 'Viral Challenges & Trends', 'Multi-Model Campaigns'],
    price: 'From $300',
    sub: 'Per video · 3-day delivery',
    cta: 'Learn More',
    icon: Play,
  },
  {
    href: '/services/business',
    tag: 'In-Person · South Florida',
    category: 'Brand Ambassadors',
    title: 'Models at Your Business',
    desc: 'A model visits your restaurant, salon, gym, or store and creates reels, stories, and promo content on-site — like having your own brand ambassador. Delivered same day.',
    items: ['On-Site Content Creation', '3–12+ Content Pieces', 'Recurring Monthly Plans', 'Same-Week Booking'],
    price: 'From $300',
    sub: 'Per session · South Florida',
    cta: 'Learn More',
    icon: TrendingUp,
  },
  {
    href: '/model-booking?service=musicvideo',
    tag: 'In-Person · South Florida',
    category: 'Music Videos',
    title: 'Creators for Your Music Video',
    desc: 'Book creators specifically for your music video — from solo featured roles to full 50+ talent productions. Our creators have credits with Sean Paul, Bryson Tiller, Trippie Redd, Kodak Black, and more.',
    items: ['Solo Features', 'Duo/Trio Leads', 'Squad Scenes (5+)', 'Full Video Cast (10-50)'],
    price: 'From $500',
    sub: 'Per feature · full day available',
    cta: 'Book Now',
    icon: Music,
  },
  {
    href: '/services/shoots',
    tag: 'In-Person · South Florida',
    category: 'Photo Shoots',
    title: 'Talent for Your Production',
    desc: 'Professional talent for brand shoots, fashion editorials, lookbooks, and non-speaking productions. We handle casting — you focus on the creative.',
    items: ['Brand Shoots', 'Fashion Editorials', 'Lookbooks', 'E-commerce'],
    price: 'From $300',
    sub: 'Per shoot · same-week available',
    cta: 'Learn More',
    icon: Camera,
  },
  {
    href: '/services/commercials',
    tag: 'In-Person · South Florida',
    category: 'Commercials & Speaking Roles',
    title: 'Talent Who Can Act & Speak',
    desc: 'Book professional creators/actresses for TV commercials, web ads, brand spots, and any production requiring script reading, dialogue, or voiceover.',
    items: ['Script Reading & Delivery', 'Dialogue & Acting', 'TV & Web Commercials', 'Monthly Subscription Available'],
    price: 'From $599',
    sub: 'Per production · subscription available',
    cta: 'Learn More',
    icon: Film,
  },
  {
    href: '/actress-models-miami',
    tag: 'Talent Partner · Casting',
    category: 'Acting & Casting',
    title: 'Actress Models, Casting & Voiceover',
    desc: 'Cast professional models and actresses for film roles, TV, commercials, voiceover, audiobooks, and brand campaigns. Talent with Netflix, Audible, and major production credits.',
    items: ['Actress Roles & Film Casting', 'Voiceover Talent', 'Audiobooks & Commercials', 'Casting Call Coordination'],
    price: 'From $599',
    sub: 'Per role or production',
    cta: 'Learn More',
    icon: Clapperboard,
  },
  {
    href: '/services/events',
    tag: 'In-Person · South Florida',
    category: 'Events & Hosting',
    title: 'Talent at Your Event',
    desc: 'Book professional creators for club nights, brand activations, private parties, and grand openings. $100/talent/hr — creators earn $50/hr.',
    items: ['Club Nights & Parties', 'Brand Activations', 'Private Events', 'Grand Openings'],
    price: 'From $400',
    sub: '1 talent · 4hr shift · $100/hr per talent',
    cta: 'Learn More',
    icon: Sparkles,
  },
  {
    href: '/model-booking?service=bottle',
    tag: 'In-Person · South Florida',
    category: 'Bottle Girls / VIP Hostesses',
    title: 'VIP Bottle Service Girls',
    desc: 'Professional VIP bottle girls and hostesses for nightclubs, lounges, and premium venues. Same rate — $100/talent/hr, creators earn $50/hr.',
    items: ['Nightclub Bottle Service', 'VIP Table Hostesses', 'Lounge & Bar Events', 'Monthly Venue Packages'],
    price: 'From $400',
    sub: '1 talent · 4hr shift · $100/hr per talent',
    cta: 'Book Now',
    icon: Wine,
  },
];

export default function ServicesPage() {
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
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Our Services</p>
        <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 100px)' }}>
          What We Do.
        </h1>
        <p className="text-white/45 text-lg max-w-xl">
          Remote content delivery or in-person at your location. Creators, content, shoots, events — everything your brand needs to dominate social media and grow your business.
        </p>
      </section>

      {/* Services */}
      <section className="border-t border-white/[0.06]">
        {services.map(({ href, tag, category, title, desc, items, price, sub, cta, icon: Icon }, i) => (
          <Link
            key={href}
            href={href}
            className="group block border-b border-white/[0.06] py-14 md:py-20 px-8 md:px-16 hover:bg-white/[0.015] transition-all duration-300 relative"
          >
            <div className="absolute top-6 right-6 md:top-8 md:right-16">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 border border-white/15 text-white/40">{tag}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16 max-w-6xl">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#c9a96e]/40 transition-colors">
                    <Icon className="h-5 w-5 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/30 group-hover:text-[#c9a96e] transition-colors">{category}</p>
                </div>
                <h2 className="font-display font-bold italic text-white leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>{title}</h2>
                <p className="text-white/45 text-[15px] leading-relaxed max-w-lg mb-6">{desc}</p>
                <div className="flex flex-wrap gap-3">
                  {items.map(item => (
                    <span key={item} className="text-white/25 text-[11px] font-medium px-3 py-1.5 border border-white/[0.06]">{item}</span>
                  ))}
                </div>
              </div>

              <div className="md:text-right shrink-0 md:pt-12">
                <p className="text-white/40 text-xs mb-1">Custom quote</p>
                <p className="text-white/25 text-xs mb-6">{sub}</p>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/25 group-hover:text-[#c9a96e] flex items-center gap-2 md:justify-end transition-colors">
                  {cta} <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">Not Sure Which Service?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Tell us your goal.<br />We&apos;ll recommend the rest.
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">Our booking flow asks who you are and matches you to the perfect service. No calls needed — checkout in under 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/start" className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              Find Your Service <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/quote" className="inline-flex items-center justify-center gap-3 px-10 py-6 text-[14px] font-bold tracking-widest uppercase border border-black/15 text-black/60 hover:text-black hover:border-black/30 transition-all">
              Talk to a Rep
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
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Brand Ambassadors</Link></li>
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
                  <li><Link href="/quote" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
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
