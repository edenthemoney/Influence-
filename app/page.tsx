import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import HeroBooking from './components/HeroBooking';
import FloatingBooking from './components/FloatingBooking';
import MobileNav from './components/MobileNav';
import HeroVideo from './components/HeroVideo';
import HomeFAQ from './components/HomeFAQ';
import { hideCopy, verifiedPartners } from '@/data/partners';
import portraitBlur from '@/data/portrait-blur.json';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Influence',
  alternateName: 'Influence',
  url: 'https://influencecreators.marketing',
  logo: 'https://influencecreators.marketing/favicon.svg',
  description: 'South Florida creator marketplace and creator marketing platform. Connect with independent creators and influencers for UGC, music promotion, brand campaigns, event activations, and creator-led social media campaigns.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-561-287-7194',
    contactType: 'sales',
  },
  sameAs: [
    'https://www.instagram.com/influencecreators.marketing',
  ],
  serviceType: ['Creator Marketplace', 'Creator Marketing', 'UGC Content Creation', 'Music Promotion', 'Brand Campaigns', 'Event Marketing', 'Social Media Campaigns'],
};

export const metadata: Metadata = {
  title: { absolute: "Miami Creator Marketplace & Creator Marketing Platform | Influence" },
  description: "South Florida creator marketplace and creator marketing platform. Connect with independent creators and influencers for UGC, music videos, brand campaigns, events, and social media campaigns in Miami, Fort Lauderdale, Boca Raton, Palm Beach.",
  openGraph: {
    title: "Miami Creator Marketplace & Creator Marketing Platform",
    description: "South Florida creator marketplace and creator marketing platform. Connect with creators for UGC, music videos, brand campaigns, events, and social media campaigns.",
    url: "https://influencecreators.marketing",
  },
};

const tickerFallback = ['Restaurants', 'Nightclubs', 'Hotels & Resorts', 'Brands', 'Events', 'Brand Ambassadors'];

const ambassadors = [
  { name: 'Deseray Marie', image: '/images/Des/IMG_3412.JPG', position: 'center 15%', meta: 'HOST', host: true },
  { name: 'Genesis Bravo', image: '/images/GenesisBravo/genesis-1.jpg', position: 'center 18%', meta: 'Brand Ambassador' },
  { name: 'Seahra Raquel', image: '/images/Seahra/seahra-2.jpg', position: 'center 42%', meta: 'Brand Ambassador' },
  { name: 'Kat', image: '/images/Kat/kat-6.jpg', position: 'center 35%', meta: 'Brand Ambassador' },
  { name: 'Ferrari', image: '/images/Ferrari/ferrari-2.jpg', position: 'center 10%', meta: 'Brand Ambassador' },
  { name: 'Alisha', image: '/images/Alisha/alisha-5.jpg', position: 'center 16%', meta: 'Brand Ambassador' },
];

const serviceGrid = [
  { title: 'Brand Ambassadors', line: 'Hosts for venues, clubs, and brand events.', href: '/services/events' },
  { title: 'Influencer Campaigns', line: 'A roster booked around a launch.', href: '/influencer-campaigns' },
  { title: 'UGC and Content', line: 'Reels and photos, filmed and delivered.', href: '/services/content' },
  { title: 'On-site Visits', line: 'Ambassadors come to the business and film.', href: '/services/business' },
  { title: 'Music Videos and Commercials', line: 'On-camera talent for shoots and spots.', href: '/music-video-creators' },
  { title: 'Browse Creators', line: 'See who is on the roster.', href: '/marketplace' },
];

type BlurEntry = { blur: string; color: string };
const blurs = portraitBlur as Record<string, BlurEntry>;

export default function HomePage() {
  const tickerNames = verifiedPartners.map((partner) => partner.name);
  const tickerItems = tickerNames.length > 0 ? tickerNames : tickerFallback;
  return (
    <div className="min-h-screen bg-[#080808]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <FloatingBooking />
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between gap-2 h-16 md:h-24 px-4 md:px-14">
          <div className="flex items-center gap-3 min-w-0">
            <MobileNav />
            <div className="hidden md:flex items-center gap-8">
              <Link href="/marketplace" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase">Creators</Link>
              <Link href="/services" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase">Services</Link>
              <Link href="/pricing" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="shrink-0 whitespace-nowrap font-display font-semibold uppercase text-[#c9a96e] text-[15px] tracking-[0.08em] md:text-[18px] md:tracking-[0.28em]">INFLUENCE</Link>
          <div className="flex items-center justify-end gap-2 md:gap-8 shrink-0">
            <Link href="/about" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[13px] tracking-[0.12em] uppercase px-3 py-2.5 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold whitespace-nowrap" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              <span className="md:hidden">Start</span>
              <span className="hidden md:inline">Start a Campaign</span>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden border-t border-white/[0.05]">
          <div className="flex whitespace-nowrap py-2 md:py-3" style={{ animation: 'ticker-left 50s linear infinite' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="shrink-0 text-white font-heading tracking-[0.12em] pr-10 md:pr-16 text-[18px] md:text-[28px]">
                {tickerItems.join('  ·  ')}&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </nav>

      <section className="h-[78vh] md:h-screen relative overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/40" />

        <div className="absolute top-28 md:top-44 left-5 md:left-16 flex items-center gap-4 max-w-[90%]">
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: '#c9a96e' }} />
          <p className="text-white text-[13px] tracking-[0.18em] uppercase font-semibold">For venues, brands, and creators</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-16 pb-8 md:pb-14 flex items-end justify-between gap-8">
          <div className="min-w-0 max-w-3xl">
            <h1 className="sr-only">
              Go Viral. Make an Influence. We match venues and brands with Brand Ambassadors and influencers.
            </h1>
            <p className="font-display font-bold italic text-white leading-[0.85]" style={{ fontSize: 'clamp(44px, 9vw, 120px)' }}>
              Go Viral.<br />
              Make an<br />
              <span style={{ color: '#c9a96e' }}>Influence.</span>
            </p>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white md:text-[18px]">
              We match venues and brands with Brand Ambassadors and influencers for events, campaigns, and content.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/start" className="inline-flex min-h-12 items-center justify-center px-5 text-[15px] font-bold tracking-[0.08em] uppercase" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
                I&apos;m a Brand / Venue
              </Link>
              <Link href="/join" className="inline-flex min-h-12 items-center justify-center border border-white px-5 text-[15px] font-bold tracking-[0.08em] uppercase text-white">
                I&apos;m a Creator
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[420px] shrink-0 hidden lg:block">
            <HeroBooking />
          </div>
        </div>
      </section>

      <section className="bg-[#080808] border-t border-white/10 px-5 py-12 md:px-16 md:py-16" aria-label="Brand Ambassadors">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>The roster</p>
            <h2 className="mt-2 font-display font-bold italic text-white leading-none" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>Brand Ambassadors</h2>
          </div>
          <Link href="/marketplace" className="shrink-0 text-[16px] font-semibold text-white underline decoration-[#c9a96e] underline-offset-4">
            View the roster
          </Link>
        </div>
        <div
          className="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-2 -mx-5 scroll-px-5 md:mx-0 md:gap-5 md:overflow-visible md:px-0"
          style={{ scrollPaddingInline: '20px' }}
        >
          {ambassadors.map((person) => {
            const blur = blurs[person.image];
            return (
              <Link
                key={person.name}
                href="/marketplace"
                className={`snap-start shrink-0 ${person.host ? 'w-[78vw] max-w-[420px] md:w-[28%]' : 'w-[64vw] max-w-[280px] md:w-[13.2%]'}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-white/10" style={{ backgroundColor: blur?.color || '#1a1a1a', borderColor: person.host ? '#c9a96e' : undefined }}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    placeholder={blur ? 'blur' : 'empty'}
                    blurDataURL={blur?.blur}
                    className="object-cover"
                    style={{ objectPosition: person.position }}
                    sizes={person.host ? '(min-width: 768px) 34vw, 78vw' : '(min-width: 768px) 16vw, 64vw'}
                  />
                </div>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: '#c9a96e' }}>{person.meta}</p>
                <p className="mt-1 font-display text-[22px] font-semibold leading-none text-white md:text-[26px]">{person.name}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="lg:hidden bg-[#0a0a0a] px-5 pt-8 pb-12 border-t border-white/10">
        <p className="mb-6 text-[13px] font-bold tracking-[0.22em] uppercase" style={{ color: '#c9a96e' }}>Choose a service</p>
        <HeroBooking />
      </section>

      <section className="bg-[#080808] border-t border-white/10 px-5 py-14 md:px-16 md:py-20">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>Services</p>
        <h2 className="mt-3 max-w-3xl font-display font-bold italic text-white leading-[0.95]" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Services for venues, brands, and creators.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceGrid.map((service) => (
            <Link key={service.title} href={service.href} className="block border border-white/10 p-6 hover:border-[#c9a96e]/50">
              <h3 className="font-display text-[28px] font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-white/85">{service.line}</p>
            </Link>
          ))}
        </div>
      </section>

      {verifiedPartners.length > 0 && (
      <section className="bg-[#080808] border-t border-white/[0.05] overflow-hidden py-14">
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker-left">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-baseline shrink-0">
                {['Sean Paul', 'Kai Cenat', 'Bryson Tiller', 'Akon', 'Moneybagg Yo', 'Lil Pump', 'Tekashi 6ix9ine', 'Bossman Dlow', 'Young Thug', 'Vybz Kartel', 'DaBaby', 'Mike Tyson'].map((name) => (
                  <span key={name} className="font-display font-semibold text-white/75 leading-none" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
                    {name}<span className="text-white/[0.06] mx-6 md:mx-10">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden mt-3">
          <div className="flex whitespace-nowrap animate-ticker-right">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-baseline shrink-0">
                {['Forbes', 'Fenty Beauty', 'SavageXFenty', 'Meta Ray-Ban', 'Love & Hip Hop', 'Miami Swim Week', 'Tyra Banks', 'Keke Palmer', 'Netflix', 'Audible'].map((name) => (
                  <span key={name} className="font-display font-light italic text-white/45 leading-none" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}>
                    {name}<span className="text-white/[0.04] mx-6 md:mx-10">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      <section className="bg-[#080808] border-t border-white/[0.05] pt-16 md:pt-32 pb-14 md:pb-28 px-8 md:px-16">
        <h2 className="font-display font-bold italic text-white leading-[0.9]" style={{ fontSize: 'clamp(40px, 8vw, 96px)' }}>Book the talent.</h2>
        <div className="flex items-end justify-between mt-8 md:mt-14 pt-6 md:pt-8 border-t border-white/[0.08]">
          <p className="text-white/65 text-[15px] font-light max-w-md leading-relaxed">
            Influence is South Florida's creator marketplace and creator marketing platform. We connect artists, brands, business owners, and labels with independent creators and influencers for UGC campaigns, music promotion, on-site shoots, event activations, acting and casting support, voiceover work, commercials, and full-scale social media campaigns.
          </p>
          <p className="text-white/35 text-[10px] tracking-[0.5em] uppercase hidden md:block">Est. 2024 · Miami, FL</p>
        </div>
      </section>

      {/* ── AI Entity / Internal Linking Block ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase mb-6" style={{ color: '#c9a96e' }}>What we do</p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="font-display font-bold italic text-white text-2xl md:text-3xl mb-4">We book Brand Ambassadors and influencers</h3>
              <p className="text-white/55 text-sm md:text-[15px] leading-relaxed mb-6">
                Influence is a Miami-based creator marketplace that connects brands and artists with independent creators and influencers for UGC campaigns, music promotion, commercials, acting and casting support, voiceover work, and brand activations. We serve South Florida — Miami, Fort Lauderdale, Boca Raton, and Orlando — and offer nationwide remote creator campaigns.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/services/content" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">UGC Content</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Reels, TikToks, and branded posts</p>
              </Link>
              <Link href="/music-video-creators" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Music Video Creators</p>
                <p className="text-white/35 text-[10px] leading-relaxed">On-camera creators for shoots & videos</p>
              </Link>
              <Link href="/services/business" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Business Content</p>
                <p className="text-white/35 text-[10px] leading-relaxed">On-site creators for local brands</p>
              </Link>
              <Link href="/services/events" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Event Marketing</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Hosting, activations & brand experiences</p>
              </Link>
              <Link href="/actress-creators-miami" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Acting & Casting</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Actress roles, casting & voiceover</p>
              </Link>
              <Link href="/start?service=storyreposts" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Story Reposts</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Instagram story amplification</p>
              </Link>
              <Link href="/start?service=collabreposts" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Collab Posts</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Dual-feed co-authored posts</p>
              </Link>
              <Link href="/start?service=reaction" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Song Promotion</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Instagram & TikTok music promo</p>
              </Link>
              <Link href="/marketplace" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Browse Creators</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Verified creators & influencers</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Persona-Based Entry Points ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-28 px-8 md:px-16">
        <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-center mb-4" style={{ color: '#c9a96e' }}>Who it&apos;s for</p>
        <h2 className="font-display font-bold italic text-white text-center mb-12 md:mb-16 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>Venues, brands, artists, and events</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Music Artists */}
          <Link href="/start?service=reaction" className="group relative border border-white/[0.08] p-6 md:p-10 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">For Artists & Labels</p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">Music Promotion</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Song reactions, story reposts, collab posts, and music video creators to get your music heard.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Get Started <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          {/* Brands */}
          <Link href="/start?service=storyreposts" className="group relative border border-white/[0.08] p-6 md:p-10 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">For Brands & Products</p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">Brand Visibility</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Story reposts, collab posts, UGC content, and brand ambassadors for maximum reach.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Get Started <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          {/* Local Businesses */}
          <Link href="/start?service=business" className="group relative border border-white/[0.08] p-6 md:p-10 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">For Local Businesses</p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">On-Site Content</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Brand ambassadors visit your location to create reels, stories, and promo content same-day.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Get Started <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          {/* Events */}
          <Link href="/start?service=event" className="group relative border border-white/[0.08] p-6 md:p-10 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">For Events & Venues</p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">Event Marketing</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Event hosting, brand activations, and VIP hostesses to amplify your venue or launch.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Get Started <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          {/* Production */}
          <Link href="/start?service=commercial" className="group relative border border-white/[0.08] p-6 md:p-10 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">For Productions</p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">Acting & Casting</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Commercials, speaking roles, voiceover creators, and casting support for TV/web productions.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Get Started <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          {/* Browse All */}
          <Link href="/services" className="group relative border border-white/[0.08] p-6 md:p-10 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">View All Services</p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-3">Full Service Menu</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Explore all our services including shoots, music videos, UGC, and more.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Browse Services <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── Cinematic Miami Drone Footage ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto mb-10 md:mb-14">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: '#c9a96e' }}>South Florida</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9]" style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}>
            Drone footage from Miami.
          </h2>
          <p className="text-white/85 text-[16px] leading-relaxed max-w-xl mt-4">
            4K footage shot over South Florida. This is the kind of coverage we film for venues and brands.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="relative w-full overflow-hidden bg-black/40" style={{ aspectRatio: '9/16' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/drone/drone-miami-01.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/drone/drone-miami-01.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="relative w-full overflow-hidden bg-black/40" style={{ aspectRatio: '9/16' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/drone/drone-miami-03.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/drone/drone-miami-03.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Selling Points ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { label: 'Minority & Women-Owned', desc: 'Black, Latina & women-led agency proudly serving all communities' },
            { label: 'Booked for the job', desc: 'Ambassadors and influencers matched to the venue, brand, or campaign.' },
            { label: 'Diverse Roster', desc: 'Models of all backgrounds, ethnicities, and styles — representation matters' },
            { label: 'Latino & Black Owned', desc: 'Supporting underrepresented founders building in South Florida' },
          ].map(({ label, desc }) => (
            <div key={label} className="border border-white/[0.06] p-5 md:p-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#c9a96e' }}>{label}</p>
              <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Accolades / Social Proof ── */}
      {!hideCopy("Rated South Florida's #1 Influencer Marketplace") && (
      <section className="bg-[#060606] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: '#c9a96e' }}>Why clients book</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9]" style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}>
            Rated South Florida&apos;s #1 Influencer Marketplace
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { stat: '★★★★★', label: 'Best Marketing Solution 2026' },
            { stat: '100s', label: 'Brands & Artists Served' },
            { stat: '#1', label: 'South Florida Premium Agency' },
            { stat: '5.0', label: 'Record Label Trusted Rating' },
          ].map(({ stat, label }) => (
            <div key={label} className="text-center py-6">
              <p className="font-display font-bold italic text-white mb-2" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{stat}</p>
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-white/85 text-[16px] text-center max-w-2xl mx-auto mt-10">
          We&apos;ve helped hundreds of brands, artists, products, businesses, and events go viral — from independent musicians to established record labels.
        </p>
      </section>
      )}

      <section className="bg-[#080808] border-t border-white/[0.05]">
        <Link href="/influencer/des-001" className="group relative block overflow-hidden h-screen">
          <Image src="/images/Des/des-21.jpg" alt="Deseray Marie" fill className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[13px] tracking-[0.18em] uppercase mb-4 font-semibold" style={{ color: '#c9a96e' }}>Host</p>
              <h3 className="font-display font-light text-white leading-none" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>Deseray Marie</h3>
              <p className="text-white/85 text-[16px] mt-3">@itsdezmarie</p>
            </div>
            <div className="flex items-center gap-2 text-white/35 group-hover:text-white transition-colors shrink-0">
              <span className="text-[10px] tracking-widest uppercase">View Profile</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:items-end">
          {[
            { id: 'maria-002', name: 'Maria', image: '/images/Maria/maria-1.jpg', tag: 'Lifestyle', h: '66vh' },
            { id: 'genesis-003', name: 'Genesis Bravo', image: '/images/Genesis/genesis-1.jpg', tag: 'Fashion', h: '48vh' },
            { id: 'ferrari-004', name: 'Ferrari', image: '/images/Ferrari/ferrari-1.jpg', tag: 'Lifestyle', h: '66vh' },
          ].map((influencer) => (
            <Link key={influencer.id} href={`/influencer/${influencer.id}`} className="group relative block overflow-hidden" style={{ height: influencer.h }}>
              <Image src={influencer.image} alt={influencer.name} fill className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[9px] tracking-widest uppercase mb-1 font-semibold" style={{ color: '#c9a96e' }}>{influencer.tag}</p>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white leading-none">{influencer.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="py-10 px-8 md:px-16 border-t border-white/5">
          <Link href="/marketplace" className="inline-flex items-center gap-3 px-10 py-5 text-[14px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
            <span>View Full Roster</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="min-h-[60vh] md:min-h-screen border-t border-white/[0.05] bg-[#060606] flex items-center px-8 md:px-16 py-20 md:py-0">
        <div>
          <p className="text-[13px] tracking-[0.18em] uppercase mb-10 font-semibold" style={{ color: '#c9a96e' }}>How to book</p>
          <p className="font-display font-semibold italic text-white leading-[1.05] mb-12" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
            Tell us the date<br />and what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Link href="/start" className="inline-flex items-center gap-3 px-10 py-5 text-[15px] font-bold tracking-[0.08em] uppercase transition-all hover:opacity-80" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              Start a booking <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="text-white/85 text-[16px] leading-relaxed">
              <p>Packages for venues, brands, and creators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Clear Service Paths ── */}
      <section className="border-t border-white/[0.05] bg-[#080808]">
        <div className="px-8 md:px-16 pt-16 md:pt-28 pb-8 md:pb-12 text-center">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: '#c9a96e' }}>Services</p>
          <h2 className="font-display font-light italic text-white leading-none mb-3" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>Remote content, or talent at your location.</h2>
          <p className="text-white/85 text-[16px] max-w-lg mx-auto">Book influencers to film remotely, or send Brand Ambassadors to a venue or shoot in South Florida.</p>
        </div>

        <div className="grid md:grid-cols-2 border-t border-white/[0.06]">
          {/* ─── Social Media Campaigns (Remote) ─── */}
          <Link href="/start?service=ugc" className="group border-r border-white/[0.06] py-14 md:py-20 px-8 md:px-14 flex flex-col hover:bg-white/[0.015] transition-all duration-300 relative">
            <div className="absolute top-6 right-6 md:top-8 md:right-10">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Remote · Nationwide</span>
            </div>

            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-bold text-white/30 group-hover:text-[#c9a96e] transition-colors">Social Media Campaigns</p>
            <h3 className="font-display font-bold italic text-white leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>Content<br/>filmed and sent to you</h3>
            <p className="text-white/85 text-[16px] leading-relaxed mb-8 max-w-sm">
              Creators film remotely and send the files. For artists, brands, and businesses that need posts they can publish.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Music Reactions — models listen & react to your songs on video',
                'UGC Reels & TikToks — branded skits, promos & short-form content',
                'Product Showcases — lifestyle content for your brand or product',
                'Album Livestreams — full album first-listen, live + recorded',
                'Multi-Model Campaigns — multiple creators for maximum reach',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#c9a96e' }} />
                  <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4 pt-5 border-t border-white/[0.06]">
                <div>
                  <p className="text-white/85 text-[16px] font-medium">Remote content, delivered to you</p>
                  <p className="text-white/25 text-xs mt-1">Get a custom quote after telling us your needs</p>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/25 group-hover:text-[#c9a96e] flex items-center gap-2 transition-colors">
                  Get Started <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* ─── In-Person (Shoots, Events & Business Content) ─── */}
          <Link href="/start?service=business" className="group py-14 md:py-20 px-8 md:px-14 flex flex-col hover:bg-white/[0.015] transition-all duration-300 relative">
            <div className="absolute top-6 right-6 md:top-8 md:right-10">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 border border-white/20 text-white/50">South Florida</span>
            </div>

            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-bold text-white/30 group-hover:text-[#c9a96e] transition-colors">In-Person Bookings</p>
            <h3 className="font-display font-bold italic text-white leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>Ambassadors at<br/>your location</h3>
            <p className="text-white/85 text-[16px] leading-relaxed mb-8 max-w-sm">
              An ambassador comes to the business, venue, or set to film, appear on camera, or host the event. South Florida.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Models at Your Business \u2014 on-site content & brand ambassador visits',
                'Music Videos — professional creators for your visual production',
                'Brand & Fashion Shoots — styled shoots for your brand or product',
                'Acting & Casting — actress roles, commercials, voiceover creators, and casting calls',
                'Event Hosting — club nights, brand activations, parties',
                'Bottle Girls & VIP Hostesses — nightclubs, lounges & premium venues',
                'Monthly Packages — recurring content visits, shoots, or event hosting',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#c9a96e' }} />
                  <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4 pt-5 border-t border-white/[0.06]">
                <div>
                  <p className="text-white/85 text-[16px] font-medium">In person across South Florida</p>
                  <p className="text-white/25 text-xs mt-1">Get a custom quote after telling us your needs</p>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/25 group-hover:text-[#c9a96e] flex items-center gap-2 transition-colors">
                  Book Now <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── South Florida Locations ── */}
      <section className="border-t border-white/[0.05] bg-[#080808]">
        <div className="px-8 md:px-16 pt-16 md:pt-28 pb-8 md:pb-12">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: '#c9a96e' }}>Where we work</p>
          <h2 className="font-display font-light italic text-white leading-none mb-3" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>South Florida</h2>
          <p className="text-white/35 text-sm max-w-lg">We know the local market, venues, and what works for South Florida audiences. Book influencers across Miami-Dade, Broward, and Palm Beach counties.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.06]">
          {[
            { name: 'Miami', href: '/influencer-marketing-miami', desc: 'Miami-Dade County' },
            { name: 'Boca Raton', href: '/influencer-marketing-boca-raton', desc: 'Palm Beach County' },
            { name: 'Fort Lauderdale', href: '/influencer-marketing-fort-lauderdale', desc: 'Broward County' },
            { name: 'West Palm Beach', href: '/influencer-marketing-west-palm-beach', desc: 'Palm Beach County' },
          ].map((location) => (
            <Link key={location.name} href={location.href} className="group border-r border-b border-white/[0.06] p-8 hover:bg-white/[0.015] transition-all duration-300">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3 font-bold text-white/30 group-hover:text-[#c9a96e] transition-colors">{location.desc}</p>
              <h3 className="font-display font-bold italic text-white leading-tight mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>{location.name}</h3>
              <p className="text-white/45 text-xs">Creator Marketing</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-40 bg-white border-t border-black/10">
        <div className="px-10 md:px-16">
          <p className="text-black/80 text-[13px] tracking-[0.18em] uppercase mb-12 font-semibold">Ready to book?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-8 md:mb-14" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>
            Start with the service you need.
          </h2>
          <p className="text-black/80 text-[16px] md:text-lg max-w-lg mb-10">Pick a service and tell us the date. Call if you want a person on the line.</p>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Link href="/start" className="group inline-flex items-center gap-4 px-10 py-5 text-[16px] font-bold tracking-[0.08em] uppercase transition-all hover:opacity-85" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              <span>Start a booking</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[16px] text-black/80">Stripe checkout. South Florida.</p>
          </div>
        </div>
      </section>

      <HomeFAQ />

      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: '#c9a96e' }}>Influence</Link>
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
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Brand Ambassadors</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Creators</Link></li>
                  <li><Link href="/start?service=bottle" className="text-white/40 hover:text-white transition-colors text-sm">Bottle Girls / VIP</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Network</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>
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
